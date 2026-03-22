from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import home, projects, skills, experience, education, contact

app = FastAPI(title="Portfolio API")

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