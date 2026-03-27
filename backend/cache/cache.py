# backend/cache/cache.py
import json
from backend.cache.redis_client import get_redis

async def get_cached(key: str) -> list | dict | None:
    r = await get_redis()
    raw = await r.get(key)
    return json.loads(raw) if raw else None

async def set_cached(key: str, value: list | dict, ttl: int):
    r = await get_redis()
    await r.set(key, json.dumps(value), ex=ttl)

async def invalidate(key: str):
    r = await get_redis()
    await r.delete(key)