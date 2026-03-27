# backend/cache/redis_client.py
import redis.asyncio as redis
from backend.config import settings

_client: redis.Redis | None = None

async def get_redis() -> redis.Redis:
    global _client
    if _client is None:
        _client = redis.from_url(settings.redis_url, decode_responses=True)
    return _client

async def close_redis():
    global _client
    if _client:
        await _client.aclose()
        _client = None