from fastapi import APIRouter, HTTPException
from backend.services.github_service import get_repos

router = APIRouter(prefix="/projects", tags=["projects"])

@router.get("")
async def list_projects():
    try:
        return await get_repos()
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"GitHub API error: {e}")

@router.get("/stats")
async def project_stats():
    repos = await get_repos()
    return {
        "repositories": len(repos),
        "open_source":  sum(1 for r in repos if r["visibility"] == "Public"),
        "total_stars":  sum(r["stars"] for r in repos)
    }