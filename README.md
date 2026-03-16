# Express + Node + React (Vite) Template

A minimal starter template combining an Express + Node backend (TypeScript-ready) with a React frontend scaffolded using Vite. Designed for fast local development and easy deployment.

**Key features:**

- **Backend:** Express, TypeScript compilation workflow, watch mode via `concurrently`.
- **Frontend:** React + Vite, TypeScript-ready, fast HMR for development.
- **Clear structure:** Separate `backend/` and `frontend/` folders for focused development.

**Quick Links**

- Backend entry: [backend/src/app.ts](backend/src/app.ts)
- Backend server: [backend/src/server.ts](backend/src/server.ts)
- Frontend entry: [frontend/src/main.tsx](frontend/src/main.tsx)

**Prerequisites**

- Node.js (v18+ recommended)
- npm (or yarn/pnpm)

**Setup**

1. Install dependencies for both projects:

```bash
cd backend
npm install

cd ../frontend
npm install
```

2. Development

Option A — single command (recommended):

```bash
# from the repository root
npm run dev
```

This runs both the frontend and backend concurrently using the root `dev` script (`npm --prefix` is used to invoke package scripts inside each workspace).

Option B — run each app separately in different terminals:

Backend (watch + run compiled code):

```bash
cd backend
npm run dev
```

Frontend (Vite dev server):

```bash
cd frontend
npm run dev
```

Notes on scripts (as shipped):

- Root `dev` runs both frontend and backend using `concurrently` and `npm --prefix` (see `package.json`).
- Root `dev:frontend` and `dev:backend` run each app individually from the repository root.
- Backend `dev` runs TypeScript compiler in watch mode and runs `dist/server.js` with Node's `--watch` flag via `concurrently` (see [backend/package.json](backend/package.json)).
- Frontend `dev` runs `vite` for instant HMR (see [frontend/package.json](frontend/package.json)).

**Build & Production**

- Frontend build:

```bash
cd frontend
npm run build
```

- Backend production: compile TypeScript and run the compiled output (project currently uses `tsc` for compilation; add a `build` and `start` script if you want to produce a production-ready binary). Example:

```bash
cd backend
npx tsc
node dist/server.js
```

**Project Structure**

- `backend/` — Express app and server code. See [backend/src](backend/src).
- `frontend/` — Vite + React app. See [frontend/src](frontend/src).
- `package.json` — workspace-level file; backend is included as a workspace.

**Environment variables**

- Add any needed env vars in `backend/config` or in a `.env` file. The repository includes a loader at [backend/src/config/load-dotenv.ts](backend/src/config/load-dotenv.ts).

**Tips & Next steps**

- Add a root-level `dev` script to run backend and frontend concurrently if you prefer a single command.
- Add `build` and `start` scripts to `backend/package.json` for a documented production flow.
- Add CI checks (linting, type checks) to enforce quality.

**Contributing**

- Fork, make changes, and open a PR. Keep backend and frontend concerns separated and document any additional scripts in this README.

**License**

- MIT (or set your preferred license).
