from fastapi import APIRouter
from backend.db import get_collection
from backend.services.mongo_service import fetch_one

router = APIRouter(prefix="/education", tags=["education"])
col    = get_collection("education")

@router.get("")
async def get_education():
    doc = await fetch_one(col, "education_data")
    return doc.get("timeline", [])

@router.get("/courses")
async def get_courses():
    doc = await fetch_one(col, "education_data")
    return doc.get("courses", [])