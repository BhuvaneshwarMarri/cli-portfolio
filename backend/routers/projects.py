from fastapi import APIRouter, HTTPException
from backend.db import get_collection
from backend.services.mongo_service import fetch_one
from backend.services.github_service import get_repos

router = APIRouter(prefix="/projects", tags=["projects"])
col = get_collection("projects")

@router.get("")
async def list_projects():
    try:
        # Get project names from MongoDB
        doc = await fetch_one(col, "projects_data")
        selected_projects = doc.get("projects", [])
        
        # Get all repos from GitHub
        all_repos = await get_repos()
        
        # Create a lowercase mapping for case-insensitive matching
        selected_lower = {name.lower() for name in selected_projects}
        
        # Filter repos to only include those in MongoDB list (case-insensitive)
        filtered_repos = [
            repo for repo in all_repos 
            if repo["name"].lower() in selected_lower
        ]
        
        return filtered_repos
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching projects: {e}")

@router.get("/stats")
async def project_stats():
    try:
        # Get project names from MongoDB
        doc = await fetch_one(col, "projects_data")
        selected_projects = doc.get("projects", [])
        
        # Get all repos from GitHub
        all_repos = await get_repos()
        
        # Create a lowercase mapping for case-insensitive matching
        selected_lower = {name.lower() for name in selected_projects}
        
        # Filter repos to only include those in MongoDB list (case-insensitive)
        filtered_repos = [
            repo for repo in all_repos 
            if repo["name"].lower() in selected_lower
        ]
        
        return {
            "repositories": len(filtered_repos),
            "open_source":  sum(1 for r in filtered_repos if r["visibility"] == "Public"),
            "total_stars":  sum(r["stars"] for r in filtered_repos)
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"GitHub API error: {e}")