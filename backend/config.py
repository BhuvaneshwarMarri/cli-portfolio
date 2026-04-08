from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

load_dotenv()

class Settings(BaseSettings):
    redis_url: str = os.getenv("REDIS_URL")
    mongo_uri: str = os.getenv("MONGO_URI")
    db_name: str = os.getenv("DB_NAME")
    github_username: str = os.getenv("GITHUB_USERNAME")
    github_token: str = os.getenv("GITHUB_TOKEN","")          # optional — raises rate limit to 5000/hr
    github_cache_ttl: int = 300     # seconds
    
    # Email Configuration
    email_enabled: bool = os.getenv("EMAIL_ENABLED", "false").lower() == "true"
    email_smtp_host: str = os.getenv("EMAIL_SMTP_HOST", "smtp.gmail.com")
    email_smtp_port: int = int(os.getenv("EMAIL_SMTP_PORT", "587"))
    email_smtp_user: str = os.getenv("EMAIL_SMTP_USER", "")
    email_smtp_password: str = os.getenv("EMAIL_SMTP_PASSWORD", "")
    email_from_address: str = os.getenv("EMAIL_FROM_ADDRESS", "")
    email_from_name: str = os.getenv("EMAIL_FROM_NAME", "Portfolio Contact Form")
    email_recipient: str = os.getenv("EMAIL_RECIPIENT", "")  # Where to send contact submissions

    class Config:
        env_file = ".env"

settings = Settings()