"""
Email service for sending contact form notifications and replies.
Uses Mailtrap API client for email delivery.
"""

import asyncio
import logging
import mailtrap as mt

from backend.config import settings

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Mailtrap credentials — sourced from Settings (which reads from .env).
# Evaluated lazily inside each method so test overrides to `settings` work.
# ---------------------------------------------------------------------------


def _token()      -> str: return settings.mailtrap_api_token
def _from_email() -> str: return settings.email_from_address
def _from_name()  -> str: return settings.email_from_name
def _to_email()   -> str: return settings.email_recipient


class EmailService:
    """Handle email sending for contact form submissions."""

    @staticmethod
    def _get_client() -> mt.MailtrapClient:
        """Return a configured Mailtrap client."""
        return mt.MailtrapClient(token=_token())

    # ------------------------------------------------------------------
    # send_contact_notification
    # ------------------------------------------------------------------

    @staticmethod
    async def send_contact_notification(
        from_name: str,
        from_email: str,
        subject: str,
        message: str,
    ) -> bool:
        """
        Send email notification to portfolio owner when contact form is submitted.

        Args:
            from_name:  Name of the person submitting the form.
            from_email: Email address of the person submitting the form.
            subject:    Subject of the message.
            message:    Body of the message.

        Returns:
            True if the email was sent successfully, False otherwise.
        """
        if not settings.email_enabled:
            logger.info("Email notifications disabled — skipping send")
            return True

        if not all([_token(), _from_email(), _to_email()]):
            logger.warning(
                "Mailtrap settings incomplete "
                "(MAILTRAP_API_TOKEN / EMAIL_FROM_ADDRESS / EMAIL_RECIPIENT) "
                "— cannot send notification email"
            )
            return False

        try:
            text_body = (
                f"New Contact Form Submission:\n\n"
                f"From: {from_name} <{from_email}>\n"
                f"Subject: {subject}\n\n"
                f"Message:\n{message}\n\n"
                f"---\n"
                f"This is an automated message from your portfolio contact form.\n"
            )

            html_body = f"""
<html>
  <body style="font-family: monospace; color: #333;">
    <h2 style="color: #0066cc;">New Contact Form Submission</h2>
    <p><strong>From:</strong> {from_name} &lt;<a href="mailto:{from_email}">{from_email}</a>&gt;</p>
    <p><strong>Subject:</strong> {subject}</p>
    <hr style="border: 1px solid #ddd; margin: 20px 0;">
    <p><strong>Message:</strong></p>
    <pre style="background: #f4f4f4; padding: 10px; border-radius: 4px;">{message}</pre>
    <hr style="border: 1px solid #ddd; margin: 20px 0;">
    <p style="color: #666; font-size: 12px;">
      This is an automated message from your portfolio contact form.
    </p>
  </body>
</html>
"""

            mail = mt.Mail(
                sender=mt.Address(email=_from_email(), name=_from_name()),
                to=[mt.Address(email=_to_email())],
                reply_to=mt.Address(email=from_email, name=from_name),
                subject=f"New Contact Form: {subject}",
                text=text_body,
                html=html_body,
            )

            # mt.MailtrapClient.send() is synchronous — run it in a thread
            # pool so it does not block FastAPI's async event loop.
            client = EmailService._get_client()
            await asyncio.to_thread(client.send, mail)

            logger.info(f"Contact notification email sent successfully from {from_email}")
            return True

        except Exception as e:
            logger.error(f"Failed to send contact notification email: {e}")
            return False

    # ------------------------------------------------------------------
    # send_autoreply
    # BUG FIX #7: was `send_autorely` (typo) — corrected to `send_autoreply`.
    # contact.py was calling the corrected name, which would raise
    # AttributeError at runtime whenever email was enabled.
    # ------------------------------------------------------------------

    @staticmethod
    async def send_autoreply(
        recipient_email: str,
        recipient_name: str,
    ) -> bool:
        """
        Send an automatic reply to the person who submitted the contact form.

        Args:
            recipient_email: Email address to send the auto-reply to.
            recipient_name:  Name of the person.

        Returns:
            True if the email was sent successfully, False otherwise.
        """
        if not settings.email_enabled:
            logger.info("Email notifications disabled — skipping auto-reply")
            return True

        if not all([_token(), _from_email()]):
            logger.warning(
                "Mailtrap settings incomplete "
                "(MAILTRAP_API_TOKEN / EMAIL_FROM_ADDRESS) "
                "— cannot send auto-reply"
            )
            return False

        try:
            text_body = (
                f"Hi {recipient_name},\n\n"
                f"Thank you for reaching out! I've received your message and will "
                f"get back to you as soon as possible.\n"
                f"Typical response time is 24–48 hours.\n\n"
                f"Best regards,\n"
                f"{_from_name()}\n"
            )

            html_body = f"""
<html>
  <body style="font-family: monospace; color: #333; line-height: 1.6;">
    <p>Hi {recipient_name},</p>
    <p>
      Thank you for reaching out! I've received your message and will get back
      to you as soon as possible.
    </p>
    <p>Typical response time is <strong>24–48 hours</strong>.</p>
    <p>Best regards,<br><strong>{_from_name()}</strong></p>
  </body>
</html>
"""

            mail = mt.Mail(
                sender=mt.Address(email=_from_email(), name=_from_name()),
                to=[mt.Address(email=recipient_email, name=recipient_name)],
                subject="Thank you for your message",
                text=text_body,
                html=html_body,
            )

            # mt.MailtrapClient.send() is synchronous — run it in a thread
            # pool so it does not block FastAPI's async event loop.
            client = EmailService._get_client()
            await asyncio.to_thread(client.send, mail)

            logger.info(f"Auto-reply sent successfully to {recipient_email}")
            return True

        except Exception as e:
            logger.error(f"Failed to send auto-reply: {e}")
            return False