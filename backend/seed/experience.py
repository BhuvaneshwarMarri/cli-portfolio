import pymongo
from config import settings

# 1. Configuration
MONGO_URI = settings.mongo_uri
DB_NAME = "Portfolio"
COLLECTION_NAME = "experience"

# 2. Your Data (converted from constants.ts)

data = {
    "type": "experience_data",

    "summary": {
        "total_exp": "2.4 yrs",
        "companies": "2",
        "stack": "Full",
        "domain": "Web · AI"
    },

    "jobs": [
        {
            "title": "Full Stack Developer",
            "company": "Tech Company",
            "period": "Jan 2023 – Present",
            "duration": "1 yr 2 mo",
            "status": "ACTIVE",
            "type": "Full-time",
            "location": "Remote",
            "stack": ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
            "bullets": [
                "Built & maintained full-stack web applications serving 10k+ daily users.",
                "Reduced page load time by 40% through code splitting, caching & lazy loading.",
                "Mentored 3 junior developers; led weekly code reviews and pair sessions.",
                "Architected CI/CD pipelines, cutting deployment time by 60%."
            ],
            "metrics": [
                {"label": "Performance", "value": "+40%", "color": "var(--accent)"},
                {"label": "Deploy Speed", "value": "+60%", "color": "var(--accent2)"},
                {"label": "Coverage", "value": "92%", "color": "var(--accent3)"}
            ]
        },
        {
            "title": "Software Engineering Intern",
            "company": "Startup Inc.",
            "period": "Jun 2022 – Dec 2022",
            "duration": "7 mo",
            "status": "PAST",
            "type": "Internship",
            "location": "Hybrid",
            "stack": ["React", "TypeScript", "Redux", "Git", "REST APIs"],
            "bullets": [
                "Engineered responsive UIs and internal dashboard tools used daily by 200+ employees.",
                "Migrated legacy codebase from JavaScript to TypeScript, reducing runtime errors by 35%.",
                "Collaborated in Agile sprints — delivered 8 features across 4 release cycles."
            ],
            "metrics": [
                {"label": "Bug Reduction", "value": "−35%", "color": "var(--accent2)"},
                {"label": "Features", "value": "8", "color": "var(--accent)"},
                {"label": "Sprints", "value": "4", "color": "var(--accent3)"}
            ]
        }
    ],

    "skill_matrix": [
        {"label": "React / TS", "level": 9, "color": "var(--accent)"},
        {"label": "Node / Express", "level": 8, "color": "var(--accent2)"},
        {"label": "Databases", "level": 8, "color": "var(--accent2)"},
        {"label": "Docker / K8s", "level": 6, "color": "var(--accent3)"},
        {"label": "System Design", "level": 7, "color": "var(--accent)"},
        {"label": "UI / UX", "level": 6, "color": "var(--text-dim)"}
    ]
}


def upload_to_mongodb():
    try:
        print("Connecting to MongoDB...")

        client = pymongo.MongoClient(MONGO_URI)
        db = client[DB_NAME]
        collection = db[COLLECTION_NAME]

        # Update or insert
        result = collection.update_one(
            {"type": "experience_data"},
            {"$set": data},
            upsert=True
        )

        if result.upserted_id:
            print("New document created!")
        else:
            print("Existing document updated!")

        print(f"Success! Data stored in {DB_NAME}.{COLLECTION_NAME}")

    except Exception as e:
        print("MongoDB Error:", e)

    finally:
        client.close()
        print("MongoDB connection closed.")


if __name__ == "__main__":
    upload_to_mongodb()