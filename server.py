import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schema import UserProfileInput
from generator import generate_roadmap

app = FastAPI(title="AI Career Roadmap API", version="1.0")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "online", "message": "AI Roadmap Backend Server is running successfully!"}

@app.post("/api/generate")
def create_user_roadmap(profile: UserProfileInput):
    try:
       
        roadmap = generate_roadmap(profile)
        return roadmap
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Generation Failed: {str(e)}")