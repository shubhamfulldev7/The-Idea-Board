# SparkBoard

A lightweight idea board where users can submit short ideas (max 280 chars) and upvote others. The stack is fully containerized for one-command local runs.

## Architecture

- Frontend: React (Vite) + Tailwind CSS
  - Routes:
    - `/` - Landing page (hero, features, CTA)
    - `/app` - Idea board app (submit, list, upvote)
  - Live feel via refetch after actions + 5s polling
- Backend: Node.js (Express)
  - REST API: `GET /ideas`, `POST /ideas`, `POST /ideas/:id/upvote`, `GET /health`
  - Auto-creates schema on startup
- Database: PostgreSQL
  - Table: `ideas(id, text, votes, created_at)`
- Containerization: Docker + Docker Compose
  - One command to run all services locally
- Kubernetes (optional): Manifests in `k8s/`

### Repo layout

- `frontend/` - React app, Tailwind, Vite
- `backend/` - Express server, `pg` client, schema bootstrap
- `k8s/` - Optional K8s manifests (backend, frontend, ingress)
- `docker-compose.yml` - Orchestrates db, backend, frontend

## Run with Docker Compose (recommended)

Prereqs: Docker and Docker Compose.

```bash
cd /home/developer/Desktop/Test_TAsk
docker-compose up --build
```

- Frontend: http://localhost:5173
- API: http://localhost:4000

Compose services:

- `db` - Postgres 16 (user: `app`, pass: `app`, db: `ideas`)
- `backend` - Express API (env `DATABASE_URL` -> `db`)
- `frontend` - Vite preview server (env `VITE_API_URL` -> `backend`)

## Run without Docker (optional)

1. Start Postgres and set `DATABASE_URL`:

```bash
export DATABASE_URL=postgres://app:app@localhost:5432/ideas
```

If needed, create user/db:

```bash
sudo -u postgres psql -c "CREATE USER app WITH PASSWORD 'app';"
sudo -u postgres psql -c "CREATE DATABASE ideas OWNER app;"
```

2. Backend:

```bash
cd /home/developer/Desktop/Test_TAsk/backend
npm install
npm start
```

API at http://localhost:4000

3. Frontend:

```bash
cd /home/developer/Desktop/Test_TAsk/frontend
npm install
npm run dev
```

App at http://localhost:5173 (set `VITE_API_URL` if API differs)

## API reference

Base URL: http://localhost:4000

- GET /health

  - 200: `{ "ok": true }`

- GET /ideas

  - 200: `[ { id, text, votes, created_at }, ... ]`
  - Sorted by votes desc, then created_at desc

- POST /ideas

  - Body: `{ "text": "string (1..280)" }`
  - 201: created idea
  - 400: invalid text

- POST /ideas/:id/upvote
  - 200: updated idea
  - 404: not found
  - 400: invalid id

## Environment variables

- Backend
  - `DATABASE_URL` (Compose: `postgres://app:app@db:5432/ideas`)
  - `PORT` (default 4000)
  - `CORS_ORIGIN` (default `http://localhost:5173`)
- Frontend
  - `VITE_API_URL` (Compose: `http://localhost:4000`)

## Data model

```sql
CREATE TABLE IF NOT EXISTS ideas (
  id SERIAL PRIMARY KEY,
  text VARCHAR(280) NOT NULL,
  votes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

## Notes & trade-offs

- Chose refetch + polling over WebSockets to keep complexity low.
- Minimal schema bootstrap at startup; in production use migrations (Prisma/Knex/Flyway).
- Frontend container uses `vite preview` for simplicity; production could use a static server or Nginx.
- No authentication; endpoints are open for demo purposes.

## Kubernetes (optional)

Manifests: `k8s/backend-deployment.yaml`, `k8s/frontend-deployment.yaml`, `k8s/ingress.yaml`.

- Update images to your registry or load local images into your cluster.
- Apply:

```bash
kubectl apply -f k8s/
```

- Ingress expects host `ideas.local` (add to `/etc/hosts` or change the manifest).

## License

MIT

