from motor.motor_asyncio import AsyncIOMotorCollection
from fastapi import HTTPException

async def fetch_one(collection: AsyncIOMotorCollection, type_key: str) -> dict:
    doc = await collection.find_one({"type": type_key}, {"_id": 0})
    if not doc:
        raise HTTPException(
            status_code=404,
            detail=f"No document with type='{type_key}' in collection '{collection.name}'. Run the seed script."
        )
    return doc