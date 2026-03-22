import pymongo
from config import settings

# 1. Configuration
MONGO_URI = settings.mongo_uri
DB_NAME = "Portfolio"
COLLECTION_NAME = "skills"
# 2. Your Data (converted from constants.ts)

data = {
    "type": "skills_data",

    "skill_groups": [
        {
            "title": "Languages",
            "icon": "λ",
            "color": "var(--accent)",
            "skills": [
                {"name": "Python", "level": 92, "tag": "primary"},
                {"name": "TypeScript", "level": 88, "tag": "primary"},
                {"name": "JavaScript", "level": 85, "tag": "primary"},
                {"name": "SQL", "level": 80, "tag": ""},
                {"name": "Java", "level": 75, "tag": ""},
                {"name": "C++", "level": 65, "tag": ""}
            ]
        },
        {
            "title": "Frontend",
            "icon": "◈",
            "color": "var(--accent2)",
            "skills": [
                {"name": "React", "level": 90, "tag": "primary"},
                {"name": "Tailwind CSS", "level": 85, "tag": ""},
                {"name": "Vite", "level": 82, "tag": ""},
                {"name": "Next.js", "level": 72, "tag": ""},
                {"name": "Framer Motion", "level": 70, "tag": ""}
            ]
        },
        {
            "title": "Backend & Infra",
            "icon": "⌘",
            "color": "var(--accent3)",
            "skills": [
                {"name": "Node.js", "level": 85, "tag": "primary"},
                {"name": "Express", "level": 82, "tag": ""},
                {"name": "PostgreSQL", "level": 78, "tag": ""},
                {"name": "MongoDB", "level": 75, "tag": ""},
                {"name": "Docker", "level": 70, "tag": ""},
                {"name": "AWS", "level": 68, "tag": ""}
            ]
        },
        {
            "title": "AI & Tools",
            "icon": "∑",
            "color": "var(--accent)",
            "skills": [
                {"name": "OpenAI API", "level": 82, "tag": "primary"},
                {"name": "Agentic AI", "level": 80, "tag": ""},
                {"name": "LangChain", "level": 75, "tag": ""},
                {"name": "Linux / Bash", "level": 78, "tag": ""},
                {"name": "Git", "level": 90, "tag": "primary"},
                {"name": "System Design", "level": 70, "tag": ""}
            ]
        }
    ],

    "tech_stack": [
        "React", "TypeScript", "Python", "Node.js", "PostgreSQL",
        "Docker", "AWS", "Redis", "REST", "GraphQL", "Git", "Linux",
        "Next.js", "LangChain", "OpenAI", "MongoDB", "Tailwind", "Vite",
        "Express", "K8s"
    ],

    "proficiency_levels": [
        {
            "label": "Expert",
            "range": "90–100%",
            "color": "var(--accent2)",
            "skills": ["React", "Git", "Python"]
        },
        {
            "label": "Proficient",
            "range": "75–89%",
            "color": "var(--accent)",
            "skills": ["TypeScript", "Node.js", "PostgreSQL", "OpenAI API"]
        },
        {
            "label": "Competent",
            "range": "60–74%",
            "color": "var(--accent3)",
            "skills": ["Docker", "LangChain", "Java", "Next.js"]
        },
        {
            "label": "Familiar",
            "range": "< 60%",
            "color": "var(--text-dim)",
            "skills": ["C++", "K8s", "Terraform"]
        }
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
            {"type": "skills_data"},
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