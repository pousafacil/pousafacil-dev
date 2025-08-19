from fastapi import FastAPI
from pydantic import BaseModel
from typing import Literal
from datetime import datetime

app = FastAPI(title="Notifications Service")


class NotificationRequest(BaseModel):
    user_id: int
    channel: Literal["email", "push", "sms"] = "email"
    subject: str | None = None
    message: str


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/send")
def send(req: NotificationRequest):
    return {
        "status": "queued",
        "channel": req.channel,
        "user_id": req.user_id,
        "message": req.message,
        "subject": req.subject,
        "queued_at": datetime.utcnow().isoformat() + "Z",
    }

