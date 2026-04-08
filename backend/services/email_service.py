"""
Email service for sending contact form notifications and replies.
Supports SMTP-based email sending with async/await pattern.
"""

import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from backend.config import settings
import logging

logger = logging.getLogger(__name__)


class EmailService:
    """Handle email sending for contact form submissions."""

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

        if not all(
            [
                settings.email_smtp_host,
                settings.email_smtp_user,
                settings.email_smtp_password,
                settings.email_recipient,
            ]
        ):
            logger.warning("Email settings incomplete — cannot send notification email")
            return False

        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = f"New Contact Form: {subject}"
            msg["From"] = f"{settings.email_from_name} <{settings.email_from_address}>"
            msg["To"] = settings.email_recipient
            msg["Reply-To"] = from_email

            text = (
                f"New Contact Form Submission:\n\n"
                f"From: {from_name} <{from_email}>\n"
                f"Subject: {subject}\n\n"
                f"Message:\n{message}\n\n"
                f"---\n"
                f"This is an automated message from your portfolio contact form.\n"
            )

            html = f"""
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

            msg.attach(MIMEText(text, "plain"))
            msg.attach(MIMEText(html, "html"))

            async with aiosmtplib.SMTP(
                hostname=settings.email_smtp_host,
                port=settings.email_smtp_port,
                use_tls=True,
            ) as smtp:
                await smtp.login(settings.email_smtp_user, settings.email_smtp_password)
                await smtp.send_message(msg)

            logger.info(f"Contact notification email sent successfully from {from_email}")
            return True

        except Exception as e:
            logger.error(f"Failed to send contact notification email: {e}")
            return False

    @staticmethod
    # BUG FIX #7: Method was named `send_autorely` (typo). Renamed to
    # `send_autoreply` — contact.py was calling the misspelled name, which
    # would raise AttributeError at runtime whenever email was enabled.
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

        if not all(
            [
                settings.email_smtp_host,
                settings.email_smtp_user,
                settings.email_smtp_password,
                settings.email_from_address,
            ]
        ):
            logger.warning("Email settings incomplete — cannot send auto-reply")
            return False

        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = "Thank you for your message"
            msg["From"] = f"{settings.email_from_name} <{settings.email_from_address}>"
            msg["To"] = recipient_email

            text = (
                f"Hi {recipient_name},\n\n"
                f"Thank you for reaching out! I've received your message and will "
                f"get back to you as soon as possible.\n"
                f"Typical response time is 24–48 hours.\n\n"
                f"Best regards,\n"
                f"{settings.email_from_name}\n"
            )

            html = f"""
<html>
  <body style="font-family: monospace; color: #333; line-height: 1.6;">
    <p>Hi {recipient_name},</p>
    <p>
      Thank you for reaching out! I've received your message and will get back
      to you as soon as possible.
    </p>
    <p>Typical response time is <strong>24–48 hours</strong>.</p>
    <p>Best regards,<br><strong>{settings.email_from_name}</strong></p>
  </body>
</html>
"""

            msg.attach(MIMEText(text, "plain"))
            msg.attach(MIMEText(html, "html"))

            async with aiosmtplib.SMTP(
                hostname=settings.email_smtp_host,
                port=settings.email_smtp_port,
                use_tls=True,
            ) as smtp:
                await smtp.login(settings.email_smtp_user, settings.email_smtp_password)
                await smtp.send_message(msg)

            logger.info(f"Auto-reply sent successfully to {recipient_email}")
            return True

        except Exception as e:
            logger.error(f"Failed to send auto-reply: {e}")
            return False