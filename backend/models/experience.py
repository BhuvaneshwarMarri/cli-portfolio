"""Pydantic models for experience data."""

from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import datetime


class Job(BaseModel):
    """Job/employment experience."""
    title: str
    company: str
    duration: str
    start_date: datetime | None = None
    end_date: datetime | None = None
    description: str | None = None
    responsibilities: List[str] = []
    technologies: List[str] = []


class SkillMatrix(BaseModel):
    """Skill usage mapping in job roles."""
    job_title: str
    skills_used: Dict[str, str] = {}


class ExperienceData(BaseModel):
    """Experience page data structure."""
    jobs: List[Job] = []
    skill_matrix: Dict[str, List[str]] = {}
    summary: str | None = None
    total_experience_years: int | None = None
