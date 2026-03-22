from motor.motor_asyncio import AsyncIOMotorClient
from backend.config import settings

client = AsyncIOMotorClient(settings.mongo_uri)
db     = client[settings.db_name]

def get_collection(name: str):
    return db[name]