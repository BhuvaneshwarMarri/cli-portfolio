from pydantic_settings import BaseSettings
from pydantic import field_validator
from dotenv import load_dotenv
import os

load_dotenv()

class Settings(BaseSettings):
    redis_url: str = os.getenv("REDIS_URL")
    mongo_uri: str = os.getenv("MONGO_URI")
    db_name: str = os.getenv("DB_NAME")
    github_username: str = os.getenv("GITHUB_USERNAME")
    github_token: str = os.getenv("GITHUB_TOKEN", "")   # optional — raises rate limit to 5000/hr
    github_cache_ttl: int = 300                          # seconds

    # -------------------------------------------------------------------------
    # Email Configuration (Mailtrap)
    # Removed dead SMTP fields (email_smtp_host/port/user/password) — no longer
    # used after switching from aiosmtplib to the Mailtrap API client.
    # -------------------------------------------------------------------------
    email_enabled: bool      = os.getenv("EMAIL_ENABLED", "false").lower() == "true"
    mailtrap_api_token: str  = os.getenv("MAILTRAP_API_TOKEN", "")
    email_from_address: str  = os.getenv("EMAIL_FROM_ADDRESS", "")
    email_from_name: str     = os.getenv("EMAIL_FROM_NAME", "Portfolio Contact Form")
    email_recipient: str     = os.getenv("EMAIL_RECIPIENT", "")   # where contact submissions go

    class Config:
        env_file = ".env"

    @field_validator("github_username")
    @classmethod
    def validate_github_username(cls, v):
        """Validate that GitHub username is configured."""
        if not v or not v.strip():
            raise ValueError("GITHUB_USERNAME environment variable is required")
        return v

    @field_validator("mailtrap_api_token", "email_from_address", "email_recipient")
    @classmethod
    def validate_email_settings(cls, v, info):
        """Validate Mailtrap settings when email is enabled."""
        if info.data.get("email_enabled", False) and not v:
            raise ValueError(
                f"EMAIL_ENABLED=true but '{info.field_name}' is not configured"
            )
        return v


settings = Settings()