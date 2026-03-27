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

    class Config:
        env_file = ".env"

settings = Settings()