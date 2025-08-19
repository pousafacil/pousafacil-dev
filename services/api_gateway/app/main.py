from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.responses import JSONResponse
from jose import jwt, JWTError
import httpx
import os

AUTH_SERVICE_URL = os.environ.get("AUTH_SERVICE_URL", "http://localhost:8001")
BOOKINGS_SERVICE_URL = os.environ.get("BOOKINGS_SERVICE_URL", "http://localhost:8002")
PAYMENTS_SERVICE_URL = os.environ.get("PAYMENTS_SERVICE_URL", "http://localhost:8003")
NOTIFICATIONS_SERVICE_URL = os.environ.get("NOTIFICATIONS_SERVICE_URL", "http://localhost:8004")

JWT_SECRET = os.environ.get("JWT_SECRET", "dev-secret")
JWT_ALG = "HS256"

app = FastAPI(title="API Gateway")


async def get_user_from_auth_header(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing Bearer token")
    token = auth_header.split(" ", 1)[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        return {"user_id": payload.get("sub")}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/auth/register")
async def register(req: Request):
    async with httpx.AsyncClient() as client:
        resp = await client.post(f"{AUTH_SERVICE_URL}/register", json=await req.json())
        return JSONResponse(status_code=resp.status_code, content=resp.json())


@app.post("/auth/login")
async def login(req: Request):
    async with httpx.AsyncClient() as client:
        resp = await client.post(f"{AUTH_SERVICE_URL}/login", json=await req.json())
        return JSONResponse(status_code=resp.status_code, content=resp.json())


@app.get("/bookings")
async def list_bookings(user=Depends(get_user_from_auth_header)):
    async with httpx.AsyncClient() as client:
        resp = await client.get(f"{BOOKINGS_SERVICE_URL}/bookings", params={"user_id": user["user_id"]})
        return JSONResponse(status_code=resp.status_code, content=resp.json())


@app.post("/bookings")
async def create_booking(req: Request, user=Depends(get_user_from_auth_header)):
    payload = await req.json()
    payload["user_id"] = user["user_id"]
    async with httpx.AsyncClient() as client:
        resp = await client.post(f"{BOOKINGS_SERVICE_URL}/bookings", json=payload)
        return JSONResponse(status_code=resp.status_code, content=resp.json())


@app.post("/payments/charge")
async def charge(req: Request, user=Depends(get_user_from_auth_header)):
    payload = await req.json()
    payload["user_id"] = user["user_id"]
    async with httpx.AsyncClient() as client:
        resp = await client.post(f"{PAYMENTS_SERVICE_URL}/charge", json=payload)
        return JSONResponse(status_code=resp.status_code, content=resp.json())


@app.post("/notifications/send")
async def send_notification(req: Request, user=Depends(get_user_from_auth_header)):
    payload = await req.json()
    payload["user_id"] = user["user_id"]
    async with httpx.AsyncClient() as client:
        resp = await client.post(f"{NOTIFICATIONS_SERVICE_URL}/send", json=payload)
        return JSONResponse(status_code=resp.status_code, content=resp.json())

