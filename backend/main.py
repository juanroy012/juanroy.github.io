from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import json
import os

app = FastAPI(title="Portfolio API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = os.path.join(os.path.dirname(__file__), "data", "portfolio.json")


def load_data():
    with open(DATA_FILE, "r") as f:
        return json.load(f)


# ── Models ────────────────────────────────────────────────────────────────────

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str


# ── API Routes ────────────────────────────────────────────────────────────────

@app.get("/api/portfolio")
def get_portfolio():
    return load_data()


@app.get("/api/projects")
def get_projects():
    data = load_data()
    return data.get("projects", [])


@app.get("/api/projects/{project_id}")
def get_project(project_id: int):
    data = load_data()
    projects = data.get("projects", [])
    project = next((p for p in projects if p["id"] == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@app.post("/api/contact")
def send_contact(msg: ContactMessage):
    # Extend this to send email via SMTP / Resend / etc.
    print(f"[CONTACT] {msg.name} <{msg.email}>: {msg.message}")
    return {"status": "ok", "message": "Message received — I'll get back to you shortly!"}


@app.get("/api/health")
def health():
    return {"status": "healthy"}


# ── Serve React Static Build ──────────────────────────────────────────────────

STATIC_DIR = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")

if os.path.exists(STATIC_DIR):
    app.mount("/assets", StaticFiles(directory=os.path.join(STATIC_DIR, "assets")), name="assets")

    @app.get("/{full_path:path}")
    def serve_spa(full_path: str):
        index = os.path.join(STATIC_DIR, "index.html")
        return FileResponse(index)
