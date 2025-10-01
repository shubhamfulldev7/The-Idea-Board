# 🚀 SparkBoard
> A lightweight idea board where users can submit short ideas (max 280 chars) and upvote others.  
> Fully containerized → run locally with **one command** ⚡  

---

## ✨ Features  

- 📝 Submit short ideas (max 280 characters)  
- 👍 Upvote others' ideas  
- 🔄 Real-time feel with **refetch + 5s polling**  
- 🐳 Fully containerized with **Docker & Compose**  
- ☸️ Optional Kubernetes manifests included  

---

## 🏗️ Architecture  

```mermaid
flowchart LR
  A[Frontend - React + Vite + Tailwind] -->|REST API| B[Backend - Node.js + Express]
  B --> C[(PostgreSQL Database)]
```

- **Frontend** → React (Vite) + Tailwind CSS  
  - `/` → Landing page (hero, features, CTA)  
  - `/app` → Idea board (submit, list, upvote)  

- **Backend** → Node.js + Express  
  - `GET /ideas`  
  - `POST /ideas`  
  - `POST /ideas/:id/upvote`  
  - `GET /health`  

- **Database** → PostgreSQL  
  - Table: `ideas(id, text, votes, created_at)`  

- **Containerization** → Docker + Docker Compose  

---

## 📂 Repository Layout  

```
frontend/      # React app (Vite + Tailwind)
backend/       # Express API + Postgres client
k8s/           # Kubernetes manifests (optional)
docker-compose.yml
```

---

## ⚡ Quick Start (Docker Compose – Recommended)  

> **Prereqs**: Install [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/)  

```bash
git clone https://github.com/your-username/sparkboard.git
cd sparkboard
docker-compose up --build
```

- 🌐 Frontend → [http://localhost:5173](http://localhost:5173)  
- 🔌 API → [http://localhost:4000](http://localhost:4000)  

**Compose Services**:  
- `db` → PostgreSQL 16 (`user: app | pass: app | db: ideas`)  
- `backend` → Express API  
- `frontend` → Vite preview server  

---

## 🛠️ Run without Docker (Manual Setup)  

1. **Start Postgres**  
   ```bash
   export DATABASE_URL=postgres://app:app@localhost:5432/ideas
   sudo -u postgres psql -c "CREATE USER app WITH PASSWORD 'app';"
   sudo -u postgres psql -c "CREATE DATABASE ideas OWNER app;"
   ```

2. **Backend**  
   ```bash
   cd backend
   npm install
   npm start
   # API -> http://localhost:4000
   ```

3. **Frontend**  
   ```bash
   cd frontend
   npm install
   npm run dev
   # App -> http://localhost:5173
   ```

---

## 📡 API Reference  

**Base URL** → `http://localhost:4000`  

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/health` | Health check |
| GET    | `/ideas`  | List ideas (sorted by votes + date) |
| POST   | `/ideas`  | Create idea `{ text: "..." }` |
| POST   | `/ideas/:id/upvote` | Upvote idea |

---

## 🗄️ Data Model  

```sql
CREATE TABLE IF NOT EXISTS ideas (
  id SERIAL PRIMARY KEY,
  text VARCHAR(280) NOT NULL,
  votes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

---

## ⚖️ Notes & Trade-offs  

- ⏳ **Polling instead of WebSockets** → simpler, good enough for MVP  
- 📦 **Schema bootstrap** on startup → in prod, use migrations (Prisma, Knex, Flyway)  
- 🖥️ **Frontend container** uses vite preview → in prod, serve via Nginx/Static server  
- 🔓 No auth → open endpoints (demo-only)  

---

## ☸️ Kubernetes (Optional)  

```bash
kubectl apply -f k8s/
```

- `backend-deployment.yaml`, `frontend-deployment.yaml`, `ingress.yaml`  
- Default host: `ideas.local` → add to `/etc/hosts`  

---

## 📜 License  

MIT License © 2025  

---

👉 Tip: Add a **screenshot or demo gif** right after the title (`# SparkBoard`) to make it instantly appealing.  
