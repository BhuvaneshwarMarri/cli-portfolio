"""Pydantic models for skills data."""

from pydantic import BaseModel
from typing import List, Dict


class SkillCategory(BaseModel):
    """Skill category grouping."""
    name: str
    skills: List[str] = []


class TechStack(BaseModel):
    """Technology stack item."""
    category: str
    technologies: List[str] = []


class ProficiencyLevel(BaseModel):
    """Proficiency level definition."""
    level: str
    description: str
    years_range: str | None = None


class SkillBreakdown(BaseModel):
    """Language or skill breakdown percentage."""
    name: str
    percentage: float
    count: int | None = None


class SkillsData(BaseModel):
    """Skills page data structure."""
    skill_groups: List[SkillCategory] = []
    tech_stack: List[TechStack] = []
    proficiency_levels: List[ProficiencyLevel] = []
    language_breakdown: List[SkillBreakdown] = []
