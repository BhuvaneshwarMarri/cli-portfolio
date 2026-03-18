from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.environ.get("MONGO_URI")
DB_NAME = os.environ.get("DB_NAME")
HOME_COLLECTION = os.environ.get("HOME_COLLECTION")

client = AsyncIOMotorClient(MONGO_URI)

db = client[DB_NAME]

collection = db[HOME_COLLECTION]