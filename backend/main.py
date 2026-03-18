from fastapi import FastAPI
from db import collection

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/interests")
async def get_interests():
    data = await collection.find_one({"type": "home_data"}, {"_id": 0})
    return data["interests"]


@app.get("/links")
async def get_links():
    data = await collection.find_one({"type": "home_data"}, {"_id": 0})
    return data["links"]


@app.get("/commands")
async def get_commands():
    data = await collection.find_one({"type": "home_data"}, {"_id": 0})
    return data["commands"]