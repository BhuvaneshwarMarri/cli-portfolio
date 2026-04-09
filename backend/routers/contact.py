"""
Contact router - Handles contact form submissions and contact information queries.

Endpoints:
  GET  /contact/info         → Fetch contact information (email, social links)
  GET  /contact/availability → Fetch availability and response time info
  GET  /contact/open-to      → Fetch list of opportunities user is open to
  POST /contact              → Submit contact form (stored in MongoDB + email sent)

Contact form submissions are stored in the 'contact_messages' collection and can
be reviewed via the admin dashboard. Email notifications are sent when
EMAIL_ENABLED=true in the .env configuration.
"""

from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from backend.db import get_collection
from backend.services.mongo_service import fetch_one
from backend.services.email_service import EmailService
from datetime import datetime, timezone
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/contact", tags=["contact"])
contact_messages_col = get_collection("contact_messages")
contact_data_col = get_collection("contact")


class ContactForm(BaseModel):
    """Contact form submission payload."""

    from_name: str
    from_email: EmailStr
    subject: str
    message: str


@router.get("/info")
async def get_contact_info():
    """Fetch contact information (email, social links).

    Returns JSON with email and social media handles/links.
    """
    doc = await fetch_one(contact_data_col, "contact_data")
    return doc.get("info", {})


@router.get("/availability")
async def get_availability():
    """Fetch availability and response time information.

    Returns status, work type, timezone, typical response time, and preferred
    contact method.
    """
    doc = await fetch_one(contact_data_col, "contact_data")
    return doc.get("availability", {})


@router.get("/open-to")
async def get_open_to():
    """Fetch list of opportunities user is open to.

    Returns an array of opportunities with an active-status flag.
    """
    doc = await fetch_one(contact_data_col, "contact_data")
    return doc.get("open_to", [])


@router.post("")
async def submit_contact(form: ContactForm):
    """Submit contact form — saves submission to MongoDB and sends email notification.

    Email notification is handled by the backend via the configured SMTP service.
    Returns a confirmation object with the submission ID.

    Response:
        status:     "received" on success.
        id:         MongoDB document ID string.
        message:    Human-readable confirmation message.
        email_sent: Whether the notification email was dispatched.
    """
    # Persist to MongoDB first; email is best-effort
    doc = form.model_dump()
    doc["submitted_at"] = datetime.now(timezone.utc).isoformat()
    doc["read"] = False

    result = await contact_messages_col.insert_one(doc)

    # Fire-and-forget email notifications — failures must not fail the API response
    email_sent = False
    try:
        
        email_sent = await EmailService.send_contact_notification(
            from_name=form.from_name,
            from_email=form.from_email,
            subject=form.subject,
            message=form.message,
        )

        # BUG FIX #7: was `send_autorely` (typo) — corrected to `send_autoreply`
        if email_sent:
            await EmailService.send_autoreply(
                recipient_email=form.from_email,
                recipient_name=form.from_name,
            )
    except Exception as e:
        logger.error(f"Error during email dispatch: {e}")
        # Form submission is already saved — do not propagate the email error

    return {
        "status": "received",
        "id": str(result.inserted_id),
        "message": "Thank you for reaching out. I'll get back to you soon.",
        "email_sent": email_sent,
    }