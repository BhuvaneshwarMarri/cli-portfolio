from motor.motor_asyncio import AsyncIOMotorCollection
from fastapi import HTTPException
from backend.cache.cache import get_cached, set_cached

MONGO_CACHE_TTL = 3600

async def fetch_one(collection: AsyncIOMotorCollection, type_key: str) -> dict:
    cache_key = f"mongo:{collection.name}:{type_key}"

    cached = await get_cached(cache_key)
    if cached:
        return cached

    doc = await collection.find_one({"type": type_key}, {"_id": 0})
    if not doc:
        raise HTTPException(
            status_code=404,
            detail=f"No document with type='{type_key}' in collection '{collection.name}'. Run the seed script."
        )

    await set_cached(cache_key, doc, ttl=MONGO_CACHE_TTL)
    return doc