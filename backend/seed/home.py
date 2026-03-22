import pymongo
from config import settings

# 1. Configuration
MONGO_URI = settings.mongo_uri
DB_NAME = "Portfolio"
COLLECTION_NAME = "home"

# 2. Your Data (converted from constants.ts)
data = {
    "type": "home_data",

    "interests": [
        {"icon": "⬡", "text": "Agentic AI & LLM tooling"},
        {"icon": "◈", "text": "Full-stack web systems"},
        {"icon": "⌘", "text": "Developer tooling & TUI apps"},
        {"icon": "λ", "text": "Open-source contributions"}
    ],

    "links": [
        {
            "icon": "◈",
            "label": "github",
            "href": "https://github.com/BhuvaneshwarMarri",
            "val": "BhuvaneshwarMarri",
            "active": True
        },
        {
            "icon": "⬡",
            "label": "linkedin",
            "href": "https://linkedin.com/in/bhuvan",
            "val": "linkedin.com/in/bhuvan",
            "active": False
        },
        {
            "icon": "@",
            "label": "email",
            "href": "mailto:bhuvan@example.com",
            "val": "bhuvan@example.com",
            "active": False
        },
        {
            "icon": "✦",
            "label": "twitter",
            "href": "https://twitter.com/bhuvan",
            "val": "@bhuvan",
            "active": False
        }
    ],

    "commands": [
        {"cmd": ":theme catppuccin", "desc": "Catppuccin"},
        {"cmd": ":theme dracula", "desc": "Dracula"},
        {"cmd": ":theme nord", "desc": "Nord"},
        {"cmd": ":theme gruvbox", "desc": "Gruvbox"},
        {"cmd": ":theme tokyo", "desc": "Tokyo Night"},
        {"cmd": ":theme nothing", "desc": "Nothing OS"},
        {"cmd": ":font", "desc": "cycle font"},
        {"cmd": ":font+ / :font-", "desc": "resize"},
        {"cmd": ":q", "desc": "exit bvim", "active": True}
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
            {"type": "home_data"},
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