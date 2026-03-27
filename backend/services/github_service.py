# backend/services/github_service.py
import httpx
from backend.config import settings
from backend.cache.cache import get_cached, set_cached

CACHE_KEY = f"github:repos:{settings.github_username}"

async def get_repos() -> list[dict]:
    cached = await get_cached(CACHE_KEY)
    if cached:
        return cached

    headers = {
        "Accept": "application/vnd.github.mercy-preview+json",
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

    # SELECTED_REPOS = {
    #     "cli-portfolio",
    #     "sg-games-platform",
    #     "agentic-ai-tools",
    #     "devops-automation",
    # }

    repos = [
        {
            "name":        r["name"],
            "description": r["description"] or "",
            "stars":       r["stargazers_count"],
            "language":    r["language"] or "Unknown",
            "url":         r["html_url"],
            "visibility":  "Public" if not r["private"] else "Private",
            "updated_at":  r["updated_at"],
            "topics":      r.get("topics", []),
        }
        for r in raw
    ]

    await set_cached(CACHE_KEY, repos, ttl=settings.github_cache_ttl)
    return repos