from fastapi import APIRouter
from backend.db import get_collection
from backend.services.mongo_service import fetch_one
from backend.services.github_service import get_repos

router = APIRouter(prefix="/skills", tags=["skills"])
col = get_collection("skills")


@router.get("")
async def get_skills():
    doc = await fetch_one(col, "skills_data")
    return doc.get("skill_groups", [])


@router.get("/tech-stack")
async def get_tech_stack():
    doc = await fetch_one(col, "skills_data")
    return doc.get("tech_stack", [])


@router.get("/proficiency")
async def get_proficiency_levels():
    doc = await fetch_one(col, "skills_data")
    return doc.get("proficiency_levels", [])


@router.get("/breakdown")
async def get_language_breakdown():
    """
    Calculate language distribution from ALL GitHub repositories.
    Returns language percentages based on actual repository language composition.
    """
    try:
        repos = await get_repos()
        if not repos:
            return []
        
        language_stats = {}
        total_repos = len(repos)
        
        # Count repositories by language
        for repo in repos:
            language = repo.get("language", "Unknown")
            if language and language != "Unknown":
                language_stats[language] = language_stats.get(language, 0) + 1
        
        # Convert counts to percentages
        breakdown = []
        for language, count in sorted(
            language_stats.items(), 
            key=lambda x: x[1], 
            reverse=True
        ):
            percentage = round((count / total_repos) * 100)
            breakdown.append({
                "lang": language,
                "percentage": percentage,
                "count": count,
            })
        
        return breakdown
    except Exception as e:
        print(f"Error calculating language breakdown: {e}")
        return []