from fastapi import APIRouter
from backend.db import get_collection
from backend.services.mongo_service import fetch_one

router = APIRouter(prefix="/experience", tags=["experience"])
col    = get_collection("experience")

@router.get("")
async def get_experience():
    doc = await fetch_one(col, "experience_data")
    return doc["jobs"]

@router.get("/skills")
async def get_experience_skills():
    doc = await fetch_one(col, "experience_data")
    return doc["skill_matrix"]

@router.get("/summary")
async def get_experience_summary():
    doc = await fetch_one(col, "experience_data")
    return doc.get("summary", {})