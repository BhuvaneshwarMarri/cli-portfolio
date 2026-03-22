import time
import httpx
from backend.config import settings

# ── Simple in-memory cache ────────────────────────────────────────────────────
_cache: dict = {"data": None, "fetched_at": 0.0}


async def get_repos() -> list[dict]:
    now = time.time()

    # Return cached data if still fresh
    if _cache["data"] is not None and (now - _cache["fetched_at"]) < settings.github_cache_ttl:
        return _cache["data"]

    headers = {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    if settings.github_token:
        headers["Authorization"] = f"Bearer {settings.github_token}"

    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://api.github.com/users/{settings.github_username}/repos",
            headers=headers,
            params={"per_page": 100, "sort": "updated"},
        )
        response.raise_for_status()
        raw = response.json()

    repos = [
        {
            "name":        r["name"],
            "description": r["description"] or "",
            "stars":       r["stargazers_count"],
            "forks":       r["forks_count"],
            "language":    r["language"] or "Unknown",
            "url":         r["html_url"],
            "visibility":  "Public" if not r["private"] else "Private",
            "updated_at":  r["updated_at"],
        }
        for r in raw
    ]

    # Store in cache
    _cache["data"] = repos
    _cache["fetched_at"] = now
    print(repos)
    return repos