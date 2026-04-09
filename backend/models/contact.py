"""Pydantic models for contact data."""

from pydantic import BaseModel, EmailStr, HttpUrl
from typing import List, Optional
from datetime import datetime


class ContactInfo(BaseModel):
    """Contact information."""
    email: EmailStr
    phone: str | None = None
    location: str | None = None
    website: HttpUrl | None = None
    social_links: dict[str, HttpUrl] = {}


class Availability(BaseModel):
    """Availability and response information."""
    status: str  # Available, Busy, Unavailable
    work_type: str | None = None  # Freelance, Full-time, Contract, etc.
    timezone: str | None = None
    response_time: str | None = None
    preferred_contact: str | None = None


class Opportunity(BaseModel):
    """Opportunity types user is open to."""
    opportunity_type: str
    description: str | None = None
    active: bool = True


class ContactData(BaseModel):
    """Contact page data structure."""
    info: ContactInfo | None = None
    availability: Availability | None = None
    open_to: List[Opportunity] = []


class ContactMessage(BaseModel):
    """Contact form submission."""
    from_name: str
    from_email: EmailStr
    subject: str
    message: str
    submitted_at: datetime | None = None
