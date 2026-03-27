from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import home, projects, skills, experience, education, contact
from contextlib import asynccontextmanager
from backend.cache.redis_client import close_redis
from backend.routers import admin


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    await close_redis()

app = FastAPI(title="Portfolio API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

for router in [home.router, projects.router, skills.router,
               experience.router, education.router, contact.router]:
    app.include_router(router)
app.include_router(admin.router)