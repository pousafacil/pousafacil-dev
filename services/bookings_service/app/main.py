from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from sqlmodel import Field, SQLModel, Session, create_engine, select
from datetime import date
import os

DB_PATH = os.environ.get("BOOKINGS_DB", "/workspace/data/bookings.db")
os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
engine = create_engine(f"sqlite:///{DB_PATH}")


class Booking(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int
    room_number: str
    check_in: date
    check_out: date
    status: str = "reserved"


class CreateBooking(BaseModel):
    user_id: int
    room_number: str
    check_in: date
    check_out: date


SQLModel.metadata.create_all(engine)

app = FastAPI(title="Bookings Service")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/bookings")
def list_bookings(user_id: int = Query(...)):
    with Session(engine) as session:
        rows = session.exec(select(Booking).where(Booking.user_id == user_id)).all()
        return rows


@app.post("/bookings")
def create_booking(payload: CreateBooking):
    with Session(engine) as session:
        booking = Booking(**payload.model_dump())
        session.add(booking)
        session.commit()
        session.refresh(booking)
        return booking

