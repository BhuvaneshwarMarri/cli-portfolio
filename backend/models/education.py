"""Pydantic models for education data."""

from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class EducationEntry(BaseModel):
    """Individual education entry."""
    school: str
    degree: str
    field: str
    graduation_date: datetime | None = None
    gpa: float | None = None
    description: str | None = None
    achievements: List[str] = []


class Course(BaseModel):
    """Individual course or certification."""
    name: str
    provider: str
    completion_date: datetime | None = None
    url: str | None = None
    certificate_id: str | None = None


class EducationData(BaseModel):
    """Education page data structure."""
    timeline: List[EducationEntry] = []
    courses: List[Course] = []
    certifications: List[str] = []
    summary: str | None = None
