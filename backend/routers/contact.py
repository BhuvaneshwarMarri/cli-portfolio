"""
Contact router - Handles contact form submissions and contact information queries.

Endpoints:
  GET  /contact/info         → Fetch contact information (email, social links)
  GET  /contact/availability → Fetch availability and response time info
  GET  /contact/open-to      → Fetch list of opportunities user is open to
  POST /contact              → Submit contact form (stored in MongoDB)

The response time is typically 24-48 hours. Contact form submissions are stored
in the 'contact_messages' collection and can be reviewed via the admin dashboard.
"""

from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from backend.db import get_collection
from backend.services.mongo_service import fetch_one
from datetime import datetime, timezone

router = APIRouter(prefix="/contact", tags=["contact"])
contact_messages_col = get_collection("contact_messages")
contact_data_col = get_collection("contact")


class ContactForm(BaseModel):
    """Contact form submission data"""
    from_name:  str
    from_email: EmailStr
    subject:    str
    message:    str


@router.get("/info")
async def get_contact_info():
    """Fetch contact information (email, social links).
    
    Returns JSON with email and social media handles/links.
    Cached via Redis.
    """
    doc = await fetch_one(contact_data_col, "contact_data")
    return doc.get("info", {})


@router.get("/availability")
async def get_availability():
    """Fetch availability and response time information.
    
    Returns status, work type, timezone, typical response time, and preferred contact method.
    Cached via Redis.
    """
    doc = await fetch_one(contact_data_col, "contact_data")
    return doc.get("availability", {})


@router.get("/open-to")
async def get_open_to():
    """Fetch list of opportunities user is open to.
    
    Returns array of opportunities with active status flag.
    Cached via Redis.
    """
    doc = await fetch_one(contact_data_col, "contact_data")
    return doc.get("open_to", [])


@router.post("")
async def submit_contact(form: ContactForm):
    """Submit contact form - saves submission to MongoDB.
    
    Email notification is handled by frontend via EmailJS.
    Returns confirmation with submission ID.
    """
    doc = form.model_dump()
    doc["submitted_at"] = datetime.now(timezone.utc).isoformat()
    doc["read"] = False
    
    result = await contact_messages_col.insert_one(doc)
    return {
        "status": "received",
        "id": str(result.inserted_id),
        "message": "Thank you for reaching out. I'll get back to you soon."
    }