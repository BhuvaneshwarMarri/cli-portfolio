# backend/services/github_service.py
import httpx
from backend.config import settings
from backend.cache.cache import get_cached, set_cached
from datetime import datetime, timedelta
from collections import defaultdict

CACHE_KEY = f"github:repos:{settings.github_username}"
PROFILE_CACHE_KEY = f"github:profile:{settings.github_username}"
CONTRIBUTIONS_CACHE_KEY = f"github:contributions:{settings.github_username}"

def infer_status(repo_name: str, topics: list) -> str:
    """Infer project status from topics and repo name."""
    if any(topic in ["research", "experimental"] for topic in topics):
        return "Research"
    if any(topic in ["in-progress", "wip", "development"] for topic in topics):
        return "In Progress"
    return "Active"

async def get_user_profile() -> dict:
    """Fetch GitHub user profile information including avatar."""
    cached = await get_cached(PROFILE_CACHE_KEY)
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
            f"https://api.github.com/users/{settings.github_username}",
            headers=headers,
        )
        response.raise_for_status()
        user_data = response.json()

    profile = {
        "avatar_url":      user_data.get("avatar_url", ""),
        "name":            user_data.get("name", settings.github_username),
        "login":           user_data.get("login", settings.github_username),
        "bio":             user_data.get("bio", ""),
        "location":        user_data.get("location", ""),
        "public_repos":    user_data.get("public_repos", 0),
        "public_gists":    user_data.get("public_gists", 0),
        "followers":       user_data.get("followers", 0),
        "following":       user_data.get("following", 0),
        "html_url":        user_data.get("html_url", ""),
        "created_at":      user_data.get("created_at", ""),
        "updated_at":      user_data.get("updated_at", ""),
    }

    await set_cached(PROFILE_CACHE_KEY, profile, ttl=settings.github_cache_ttl)
    return profile

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

    repos = [
        {
            "id":            r["id"],
            "name":          r["name"],
            "full_name":     r["full_name"],
            "owner":         r["owner"]["login"],
            "owner_avatar":  r["owner"]["avatar_url"],
            "description":   r["description"] or "",
            "url":           r["html_url"],
            "homepage":      r["homepage"] or None,
            "visibility":    "Public" if not r["private"] else "Private",
            "language":      r["language"] or "Unknown",
            "license":       r["license"]["name"] if r["license"] else None,
            "stars":         r["stargazers_count"],
            "watchers":      r["watchers_count"],
            "forks":         r["forks_count"],
            "open_issues":   r["open_issues_count"],
            "network_count": r["network_count"] if "network_count" in r else r["forks_count"],
            "size":          r["size"],
            "topics":        r.get("topics", []),
            "status":        infer_status(r["name"], r.get("topics", [])),
            "created_at":    r["created_at"],
            "updated_at":    r["updated_at"],
            "pushed_at":     r["pushed_at"],
            "is_fork":       r["fork"],
            "archived":      r["archived"],
            "disabled":      r["disabled"],
            "has_wiki":      r["has_wiki"],
            "has_pages":     r["has_pages"],
            "is_template":   r.get("is_template", False),
        }
        for r in raw
    ]

    await set_cached(CACHE_KEY, repos, ttl=settings.github_cache_ttl)
    return repos

async def get_contribution_data() -> list[int]:
    """
    Fetch GitHub contribution data for the last 24 weeks using GraphQL.
    Returns a list of 24 integers representing contribution counts per week.
    """
    cached = await get_cached(CONTRIBUTIONS_CACHE_KEY)
    if cached:
        return cached

    headers = {
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    if settings.github_token:
        headers["Authorization"] = f"Bearer {settings.github_token}"
    else:
        print("[get_contribution_data] No GitHub token - using REST API fallback")
        return await _get_contributions_rest_fallback(headers)

    query = """
    query {
      user(login: "%s") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
    """ % settings.github_username

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.github.com/graphql",
                headers=headers,
                json={"query": query},
            )
            response.raise_for_status()
            data = response.json()

        if "errors" in data:
            print(f"[get_contribution_data] GraphQL error: {data['errors']}")
            return [0] * 24

        weeks = data.get("data", {}).get("user", {}).get("contributionsCollection", {}).get("contributionCalendar", {}).get("weeks", [])
        
        # Get last 24 weeks
        recent_weeks = weeks[-24:] if len(weeks) >= 24 else weeks
        
        # Calculate contribution count per week
        contributions = []
        for week in recent_weeks:
            week_count = sum(day.get("contributionCount", 0) for day in week.get("contributionDays", []))
            # Cap at 8 for visualization
            contributions.append(min(week_count, 8))
        
        # Pad if less than 24 weeks
        while len(contributions) < 24:
            contributions.insert(0, 0)
        
        await set_cached(CONTRIBUTIONS_CACHE_KEY, contributions, ttl=settings.github_cache_ttl)
        return contributions

    except Exception as e:
        print(f"[get_contribution_data] Error fetching contributions: {e}")
        return [0] * 24

async def _get_contributions_rest_fallback(headers: dict) -> list[int]:
    """
    Fallback: Fetch contribution data from GitHub REST API events.
    Less reliable but works without token.
    """
    try:
        async with httpx.AsyncClient() as client:
            # Fetch user events (recent activity)
            response = await client.get(
                f"https://api.github.com/users/{settings.github_username}/events/public",
                headers=headers,
                params={"per_page": 100},
            )
            response.raise_for_status()
            events = response.json()

        # Group events by week (last 24 weeks)
        now = datetime.utcnow()
        week_contributions = defaultdict(int)
        
        for event in events:
            if event.get("type") in ["PushEvent", "PullRequestEvent", "IssuesEvent", "CreateEvent"]:
                try:
                    created_at = datetime.fromisoformat(event["created_at"].replace("Z", "+00:00"))
                    weeks_ago = (now - created_at).days // 7
                    
                    # Only count events from last 24 weeks
                    if 0 <= weeks_ago < 24:
                        week_contributions[weeks_ago] += 1
                except (ValueError, KeyError):
                    continue

        # Build array of 24 weeks (most recent first, then backwards)
        contributions = [min(week_contributions.get(i, 0), 8) for i in range(24)]
        
        await set_cached(CONTRIBUTIONS_CACHE_KEY, contributions, ttl=settings.github_cache_ttl)
        return contributions

    except Exception as e:
        print(f"[_get_contributions_rest_fallback] Error: {e}")
        return [0] * 24