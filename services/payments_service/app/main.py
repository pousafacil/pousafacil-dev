from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime

app = FastAPI(title="Payments Service")


class ChargeRequest(BaseModel):
    user_id: int
    amount: float
    currency: str = "USD"
    description: str | None = None


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/charge")
def charge(req: ChargeRequest):
    return {
        "status": "approved",
        "provider": "sandbox",
        "charged_at": datetime.utcnow().isoformat() + "Z",
        "amount": req.amount,
        "currency": req.currency,
        "user_id": req.user_id,
        "description": req.description,
    }

