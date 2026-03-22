import pymongo
from config import settings

# 1. Configuration
MONGO_URI = settings.mongo_uri
DB_NAME = "Portfolio"
COLLECTION_NAME = "education"


# 2. Your Data (converted from constants.ts)

data = {
    "type": "education_data",

    "timeline": [
        {
            "year": "2020",
            "title": "Enrolled — B.Tech CSE",
            "place": "University Name",
            "detail": "Began Bachelor of Technology in Computer Science Engineering. Focused on core CS fundamentals.",
            "tags": ["C", "Python", "Math", "Logic"],
            "status": "done"
        },
        {
            "year": "2021",
            "title": "Linux System Administration",
            "place": "Linux Foundation · Certification",
            "detail": "Certified Linux sysadmin — shell scripting, processes, and networking.",
            "tags": ["Linux", "Bash", "Networking"],
            "status": "done"
        },
        {
            "year": "2022",
            "title": "Docker & Kubernetes",
            "place": "CNCF · Certification",
            "detail": "Containerisation fundamentals — Docker images, Compose, and Kubernetes.",
            "tags": ["Docker", "K8s", "DevOps"],
            "status": "done"
        },
        {
            "year": "2022",
            "title": "Internship — Software Engineering",
            "place": "Startup Inc.",
            "detail": "Built responsive UIs with React & TypeScript, participated in code reviews.",
            "tags": ["React", "TypeScript", "Git"],
            "status": "done"
        },
        {
            "year": "2023",
            "title": "Advanced React & TypeScript",
            "place": "Udemy · Certification",
            "detail": "React architecture, custom hooks, performance patterns and TypeScript generics.",
            "tags": ["React", "TypeScript", "Hooks"],
            "status": "done"
        },
        {
            "year": "2023",
            "title": "Cloud Computing & AWS",
            "place": "AWS · Certification",
            "detail": "EC2, S3, Lambda, RDS and cloud architecture for production systems.",
            "tags": ["AWS", "Cloud", "Lambda"],
            "status": "done"
        },
        {
            "year": "2024",
            "title": "Graduating — B.Tech CSE",
            "place": "University Name · Expected 2024",
            "detail": "Final year. GPA 8.9/10. Capstone project on agentic AI developer tooling.",
            "tags": ["System Design", "AI", "Capstone"],
            "status": "active"
        },
        {
            "year": "→",
            "title": "What's Next",
            "place": "Open to opportunities",
            "detail": "Looking for full-time SWE / AI engineering roles.",
            "tags": ["Full-time", "Remote / Hybrid"],
            "status": "next"
        }
    ],

    "courses": [
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Operating Systems",
        "Computer Networks",
        "Software Engineering",
        "Machine Learning",
        "Distributed Systems",
        "System Design"
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
            {"type": "education_data"},
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