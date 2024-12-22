from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from pyrogram import Client, errors

API_ID = 24484413
API_HASH = "ccd5bf636451640ab7d37c5d31252ac6"
SESSION_NAME = "my_session"

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Запуск приложения...")
    yield
    print("Остановка приложения...")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def parse_link(link: str) -> str:
    if link.startswith("https://t.me/+"):
        return "invite_link"
    elif link.startswith("https://t.me/") or link.startswith("@"):
        return "username_link"
    else:
        raise HTTPException(status_code=400, detail="Unsupported link format")

@app.post("/process_link")
async def process_link(input_data: dict):
    """
    Unified endpoint to process Telegram links:
    - Handles invite links, username links, and @usernames.
    - Allows extracting messages with an optional limit.
    """
    link_input = input_data.get("link_input")
    limit = input_data.get("limit", 100)  # Опциональный лимит (по умолчанию 100)

    if not link_input:
        raise HTTPException(status_code=400, detail="Missing link_input")

    if limit is not None:
        try:
            limit = int(limit)
            if limit <= 0:
                raise ValueError
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid limit: must be a positive integer")

    link_type = parse_link(link_input)

    try:
        async with Client(SESSION_NAME, api_id=API_ID, api_hash=API_HASH) as client:
            if link_type == "invite_link":
                try:
                    chat = await client.join_chat(link_input)
                except errors.UserAlreadyParticipant:
                    chat = await client.get_chat(link_input)
            elif link_type == "username_link":
                username = link_input.split("/")[-1] if "https" in link_input else link_input[1:]
                chat = await client.get_chat(username)
            else:
                raise HTTPException(status_code=400, detail="Unsupported link type")

            messages = []
            async for message in client.get_chat_history(chat_id=chat.id, limit=limit):
                messages.append({
                    "text": message.text or "",
                    "date": message.date.isoformat() if message.date else None,
                    "from_user": message.from_user.username if message.from_user else None,
                })

            return {
                "status": "success",
                "chat_id": chat.id,
                "chat_title": chat.title,
                "messages": messages,
            }

    except errors.UsernameNotOccupied:
        raise HTTPException(status_code=404, detail="The username does not exist or is invalid")
    except errors.ChatWriteForbidden:
        raise HTTPException(status_code=403, detail="Bot does not have write access to this chat")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Telegram API error: {str(e)}")