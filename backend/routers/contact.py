from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from backend.db import get_collection
from datetime import datetime, timezone

router = APIRouter(prefix="/contact", tags=["contact"])
col    = get_collection("contact_messages")

class ContactForm(BaseModel):
    from_name:  str
    from_email: EmailStr
    subject:    str
    message:    str

@router.post("")
async def submit_contact(form: ContactForm):
    doc = form.model_dump()
    doc["submitted_at"] = datetime.now(timezone.utc).isoformat()
    await col.insert_one(doc)
    return {"status": "received"}