# backend/routers/admin.py
from fastapi import APIRouter
from backend.cache.cache import invalidate

router = APIRouter(prefix="/admin", tags=["admin"])

CACHE_KEYS = [
    "github:repos:BhuvaneshwarMarri",
    "mongo:education:education_data",
    "mongo:skills:skills_data",
    "mongo:experience:experience_data",
    "mongo:about:home_data",
]

@router.post("/cache/invalidate")
async def bust_all_cache():
    for key in CACHE_KEYS:
        await invalidate(key)
    return {"ok": True, "cleared": CACHE_KEYS}