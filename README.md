# ⛰️ PathToPeak — Placement Ascent Engine

PathToPeak is a full-stack career preparation and placement readiness platform designed to help students climb from Base Camp (10 LPA) to Ridge Camp (15 LPA) and Apex Summit (20+ LPA).

The project is structured as a full-stack monorepo featuring an isolated **frontend** (React + TypeScript + Tailwind CSS) and **backend** (Node.js + Express + Prisma ORM) ready for deployment on **Render**.

---

## 📁 Project Structure

```
PathToPeak/
├── frontend/                   # Client application (Vite + React 19)
│   ├── src/
│   │   ├── components/         # UI components (Navbar, Footer, etc.)
│   │   ├── context/            # Global AppContext & State with API sync
│   │   ├── data/               # Local mock data & fallbacks
│   │   ├── services/           # REST API client (api.ts)
│   │   ├── types/              # TypeScript definitions
│   │   └── views/              # Views (Command Deck, Radar, Summit Scouting, etc.)
│   ├── package.json
│   └── vite.config.ts          # Includes dev proxy forwarding /api -> :5000
│
├── backend/                    # Server API (Express + Prisma + TypeScript)
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema (Profile, Skills, Companies, Tasks)
│   │   └── seed.ts             # Initial database seeder
│   ├── scripts/
│   │   └── prepare-postgres.js # Auto-configures PostgreSQL provider on Render
│   ├── src/
│   │   ├── data/               # Seed data source
│   │   ├── routes/             # REST Endpoints (profile, skills, companies, tasks)
│   │   ├── db.ts               # PrismaClient instance
│   │   ├── index.ts            # Server entry point & CORS configuration
│   │   └── types/              # Backend types
│   ├── .env                    # Local environment config (SQLite default)
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── package.json                # Root orchestration with npm workspaces
├── render.yaml                 # Render Blueprint (Infrastructure-as-Code)
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
From the repository root:
```bash
npm install
```

### 2. Set Up the Local Database
The backend is pre-configured with SQLite for zero-config local development:
```bash
cd backend
npx prisma db push
npx prisma db seed
cd ..
```

### 3. Run Both Frontend & Backend Concurrently
From the root directory:
```bash
npm run dev
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🛠️ Individual Commands

| Command | Description |
|---|---|
| `npm run dev` | Runs both frontend and backend concurrently |
| `npm run dev:frontend` | Runs Vite frontend development server only |
| `npm run dev:backend` | Runs Express backend with hot-reloading (`tsx watch`) |
| `npm run build` | Builds both frontend and backend bundles |
| `npm run build:frontend` | Compiles Vite production bundle into `frontend/dist` |
| `npm run build:backend` | Compiles TypeScript backend into `backend/dist` |

Inside `backend/`:
| Command | Description |
|---|---|
| `npm run db:push` | Synchronizes Prisma schema with the database |
| `npm run db:seed` | Populates database with default PathToPeak data |
| `npm run db:studio` | Opens visual database inspector in browser |

---

## ☁️ Deploying to Render

This repository is pre-configured for **1-click deployment** on Render using the included `render.yaml` Blueprint.

### Option A: Render Blueprint (Recommended)

1. Push this repository to **GitHub** or **GitLab**.
2. Go to the [Render Dashboard](https://dashboard.render.com).
3. Click **New +** > **Blueprint**.
4. Connect your `PathToPeak` repository.
5. Render will detect `render.yaml` and automatically provision:
   - **`pathtopeak-backend`**: Node.js Web Service
   - **`pathtopeak-frontend`**: Static Site CDN with SPA rewrite rules
   - **`pathtopeak-db`**: Managed PostgreSQL Database
6. Click **Apply**. Render will automatically configure internal networking, database connection strings, and deploy the entire stack!

### Option B: Manual Setup on Render Dashboard

If you prefer creating services manually:

#### 1. Database (PostgreSQL)
- Click **New +** > **PostgreSQL**.
- Name: `pathtopeak-db`
- Copy the **Internal Database URL** (or External URL).

#### 2. Backend (Web Service)
- Click **New +** > **Web Service**.
- Connect your repo.
- **Root Directory**: `backend`
- **Build Command**: `npm install && npm run build`
- **Pre-Deploy Command**: `npm run db:deploy`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `DATABASE_URL`: *(Paste your PostgreSQL URL)*
  - `CORS_ORIGIN`: *(Your frontend URL, e.g. `https://pathtopeak-frontend.onrender.com`)*
  - `PORT`: `5000`
  - `NODE_ENV`: `production`

#### 3. Frontend (Static Site)
- Click **New +** > **Static Site**.
- Connect your repo.
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL`: *(Your backend URL, e.g. `https://pathtopeak-backend.onrender.com`)*
- Under **Redirects/Rewrites**:
  - Add rewrite: `/*` -> `/index.html` (Status: `Rewrite`)

---

## 📡 API Endpoints

- `GET /api/health`: Health status & server uptime
- `GET /api/profile`: Fetch current student profile
- `PUT /api/profile`: Update profile info & stats
- `GET /api/skills`: List all tracked technical skills
- `PATCH /api/skills/:id`: Update proficiency level for a skill
- `GET /api/companies`: List recruiting companies & target CTCs
- `GET /api/tasks`: List planner tasks
- `POST /api/tasks`: Add new planner task
- `PATCH /api/tasks/:id/toggle`: Toggle task completion status
- `DELETE /api/tasks/:id`: Delete a task
