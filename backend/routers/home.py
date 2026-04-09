from fastapi import APIRouter
from backend.db import get_collection
from backend.services.mongo_service import fetch_one

router = APIRouter(prefix="/home", tags=["home"])
col    = get_collection("home")

@router.get("/interests")
async def get_interests():
    doc = await fetch_one(col, "home_data")
    return doc.get("interests", [])

@router.get("/links")
async def get_links():
    doc = await fetch_one(col, "home_data")
    return doc.get("links", [])

@router.get("/commands")
async def get_commands():
    doc = await fetch_one(col, "home_data")
    return doc.get("commands", [])