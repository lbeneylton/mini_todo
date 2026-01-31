from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import SessionLocal, engine
from models import Base, Task

Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS (ESSENCIAL pro front funcionar)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # em prod você restringe
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/tasks")
def list_tasks(db: Session = Depends(get_db)):
    return db.query(Task).all()

@app.post("/tasks")
def create_task(title: str, db: Session = Depends(get_db)):
    task = Task(title=title)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task
  
@app.get("/debug/tasks")
def debug_tasks(db: Session = Depends(get_db)):
    return db.query(Task).all()
