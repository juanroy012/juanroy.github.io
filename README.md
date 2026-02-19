# Portfolio — React + FastAPI

A sleek, full-stack developer portfolio for a Computer Programming student.  
**Frontend:** React 18 + Vite + Tailwind CSS + Framer Motion  
**Backend:** Python FastAPI — serves the API & the built React SPA  
**Deploy:** fly.io (single Docker container)

---

## Quick start (local dev)

### 1. Backend
```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2. Frontend (separate terminal)
```bash
cd frontend
npm install
npm run dev        # Vite dev server on http://localhost:5173
                   # API calls proxy to http://localhost:8000
```

---

## Personalise your portfolio

Edit **`backend/data/portfolio.json`** — fill in:

| Field | What to change |
|-------|---------------|
| `personal.name` | Your full name |
| `personal.email` | Your email address |
| `personal.github / linkedin / twitter` | Your profile URLs |
| `personal.bio` | 2–3 sentence bio |
| `personal.location` | City, Country |
| `projects[].name` | Project display name |
| `projects[].subdomain` | e.g. `myproject.yourdomain.com` |
| `projects[].description` | Short project description |
| `projects[].tech` | Tech stack array |
| `projects[].github` | GitHub repo URL |
| `education` / `experience` | Your background |
| `skills` | Categorised skill lists |

---

## Deploy to fly.io

### Prerequisites
- [Install flyctl](https://fly.io/docs/hands-on/install-flyctl/)
- `fly auth login`

### First deploy
```bash
# From root of project:
fly launch               # creates the app, follow prompts
fly deploy               # builds Docker image & deploys
```

### Subsequent deploys
```bash
fly deploy
```

### Custom domain + subdomains
1. `fly certs add yourdomain.com` — add your root domain
2. Point each project subdomain's DNS `A` record to your machine's IP  
   (`fly ips list` to find it)
3. Update `subdomain` fields in `portfolio.json` accordingly

---

## Project structure
```
portfolio/
├── backend/
│   ├── main.py              # FastAPI app
│   ├── requirements.txt
│   └── data/
│       └── portfolio.json   # ← edit this!
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   └── hooks/
│   │       └── usePortfolio.js
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── Dockerfile
├── fly.toml
└── .dockerignore
```
