from fastapi import APIRouter
from backend.db import get_collection
from backend.services.mongo_service import fetch_one

router = APIRouter(prefix="/skills", tags=["skills"])
col = get_collection("skills")


@router.get("")
async def get_skills():
    doc = await fetch_one(col, "skills_data")
    return doc["skill_groups"]


@router.get("/tech-stack")
async def get_tech_stack():
    doc = await fetch_one(col, "skills_data")
    return doc["tech_stack"]


@router.get("/proficiency")
async def get_proficiency_levels():
    doc = await fetch_one(col, "skills_data")
    return doc["proficiency_levels"]