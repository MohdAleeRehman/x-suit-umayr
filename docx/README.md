# X Suite UMAYR

Production-ready monorepo for the X Suite real estate platform.

## Current Status

- Phase 6: Backend setup, auth hardening, API tests completed
- Phase 7: Frontend setup, API integration, mobile optimization completed
- Phase 8: PWA + deployment configuration completed in repository
- Phase 9: Testing + migration runbook deliverables completed in repository

## Repository Structure

- backend: Express + MongoDB Atlas API (single superadmin model)
- frontend: Next.js App Router UI (Sale, Rent, Property, Records)
- docx: copy of root markdown documentation files
- root docs: discovery and architecture references

## Core Features

- Single-user superadmin authentication (username locked to `umair`)
- Records CRUD with search and soft-delete
- PWA support with manifest + service worker + offline page
- Render and Vercel deployment configuration
- JWT no-expiry option via environment variable

## Tech Stack

### Backend

- Node.js, Express, Mongoose
- Joi validation
- JWT auth + bcrypt password hashing
- Jest + Supertest API tests

### Frontend

- Next.js 16 App Router
- TypeScript + Tailwind v4
- Shared component and hook architecture
- Jest + React Testing Library smoke tests

## Environment Setup

### Backend `.env`

Required keys:

- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_NO_EXPIRATION` (`true` for no-exp tokens)
- `SUPERADMIN_USERNAME`
- `SUPERADMIN_PASSWORD`
- `CORS_ORIGIN`
- `APP_BASE_URL`

### Frontend `.env.local`

- `NEXT_PUBLIC_API_BASE_URL=http://localhost:3001`

## Local Development

### Backend

```bash
npm --prefix backend install
npm --prefix backend start
```

### Frontend

```bash
npm --prefix frontend install
npm --prefix frontend dev
```

## Verification Commands

### Backend tests

```bash
npm --prefix backend test
```

### Frontend checks

```bash
npm --prefix frontend run lint
npm --prefix frontend run test
npm --prefix frontend run build
```

## Deployment

### Backend on Render

- Use `backend/render.yaml` or create a Web Service manually
- Set required environment variables in Render dashboard
- Health endpoint: `/api/health`

### Frontend on Vercel

- Import repository and set root directory to `frontend`
- Confirm `NEXT_PUBLIC_API_BASE_URL` points to Render backend URL
- Keep `frontend/vercel.json` committed for build/runtime defaults

## Phase 8 Deliverables (Repository)

- `frontend/public/sw.js`
- `frontend/src/app/manifest.ts`
- `frontend/src/app/offline/page.tsx`
- `frontend/src/components/pwa/PWARegister.tsx`
- `frontend/vercel.json`
- `backend/render.yaml`

## Phase 9 Deliverables (Repository)

- Frontend Jest/RTL test setup and smoke tests
- Migration and cutover runbook
- Deployment verification checklist

## Documentation

Primary architecture and discovery docs are at project root and duplicated under `docx/` as requested.

## Security Note

Do not commit real production secrets beyond controlled internal usage. Rotate `JWT_SECRET` and database credentials before public release.
