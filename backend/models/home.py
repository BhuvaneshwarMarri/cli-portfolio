"""Pydantic models for home page data."""

from pydantic import BaseModel
from typing import List, Dict, Any


class Interest(BaseModel):
    """Individual interest item."""
    name: str
    description: str | None = None


class Link(BaseModel):
    """Social media or external links."""
    title: str
    url: str
    icon: str | None = None


class Command(BaseModel):
    """Terminal command for BVIM interface."""
    command: str
    description: str
    response: str | None = None


class HomeData(BaseModel):
    """Home page data structure."""
    interests: List[Interest] = []
    links: List[Link] = []
    commands: List[Command] = []
    intro_text: str | None = None
    social_media: Dict[str, str] = {}
