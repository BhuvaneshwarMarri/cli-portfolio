"""Pydantic models for project data."""

from pydantic import BaseModel, HttpUrl
from typing import List, Optional


class Project(BaseModel):
    """Individual portfolio project."""
    name: str
    description: str | None = None
    url: HttpUrl | None = None
    repository_url: HttpUrl | None = None
    technologies: List[str] = []
    status: str = "Active"  # Active, Completed, Archived, Research, In Progress
    image_url: str | None = None
    featured: bool = False
    start_date: str | None = None
    end_date: str | None = None


class ProjectData(BaseModel):
    """Projects page data structure."""
    projects: List[str] = []  # List of project names to display
    featured_projects: List[str] = []  # List of featured project names
    categories: dict[str, List[str]] = {}  # Category -> list of project names
