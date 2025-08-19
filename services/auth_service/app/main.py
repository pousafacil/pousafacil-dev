from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt
from sqlmodel import Field, Session, SQLModel, create_engine, select
import os
from datetime import datetime, timedelta

JWT_SECRET = os.environ.get("JWT_SECRET", "dev-secret")
JWT_ALG = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    password_hash: str


class RegisterPayload(BaseModel):
    email: str
    password: str


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


DB_PATH = os.environ.get("AUTH_DB", "/workspace/data/auth.db")
os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
engine = create_engine(f"sqlite:///{DB_PATH}")
SQLModel.metadata.create_all(engine)

app = FastAPI(title="Auth Service")


def create_access_token(user_id: int) -> str:
    payload = {
        "sub": str(user_id),
        "exp": datetime.utcnow() + timedelta(hours=12),
        "iat": datetime.utcnow(),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)


@app.post("/register")
def register(payload: RegisterPayload) -> dict:
    with Session(engine) as session:
        existing = session.exec(select(User).where(User.email == payload.email)).first()
        if existing:
            raise HTTPException(409, "Email already registered")
        user = User(email=payload.email, password_hash=pwd_context.hash(payload.password))
        session.add(user)
        session.commit()
        session.refresh(user)
        return {"id": user.id, "email": user.email}


class LoginPayload(BaseModel):
    email: str
    password: str


@app.post("/login", response_model=TokenOut)
def login(payload: LoginPayload):
    with Session(engine) as session:
        user = session.exec(select(User).where(User.email == payload.email)).first()
        if not user or not pwd_context.verify(payload.password, user.password_hash):
            raise HTTPException(401, "Invalid credentials")
        token = create_access_token(user.id)
        return TokenOut(access_token=token)


@app.get("/health")
def health():
    return {"status": "ok"}

