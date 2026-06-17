# Phase 8 Deployment Checklist (Vercel + Render)

## Goal

Use this checklist to complete and verify production deployment.

## 1. GitHub Source

- [x] Repository pushed to GitHub
- [x] Branch `main` is up to date
- [x] `frontend/vercel.json` exists
- [x] `backend/render.yaml` exists

## 2. Render Backend Setup

Create a web service from repository root `backend` or use `render.yaml`.

### Required Environment Variables

- `NODE_ENV=production`
- `PORT=10000`
- `MONGODB_URI=<atlas-connection-string>`
- `JWT_SECRET=<production-secret>`
- `JWT_NO_EXPIRATION=true`
- `SUPERADMIN_USERNAME=umair`
- `SUPERADMIN_NAME=Umair`
- `SUPERADMIN_PASSWORD=<secure-password>`
- `CORS_ORIGIN=<vercel-frontend-url>`
- `APP_BASE_URL=<vercel-frontend-url>`

### Verification

- [ ] Build succeeds on Render
- [ ] Health endpoint returns 200: `/api/health`
- [ ] Login endpoint works: `/api/auth/login`
- [ ] Rate limit headers present on `/api/*`

## 3. Vercel Frontend Setup

Import project with root directory set to `frontend`.

### Required Environment Variables

- `NEXT_PUBLIC_API_BASE_URL=<render-backend-url>`

### Verification

- [ ] Vercel build succeeds
- [ ] App routes load: `/login`, `/dashboard`, `/sale`, `/rent`, `/property`, `/records`
- [ ] Auth and API calls hit Render backend

## 4. PWA Validation

- [ ] `manifest.webmanifest` served correctly
- [ ] Service worker `sw.js` registers successfully
- [ ] Offline page works when network is disabled (`/offline` fallback)
- [ ] iOS Add to Home Screen test passed
- [ ] Android install prompt test passed
- [ ] Lighthouse PWA audit >= 90

## 5. Security and Operations

- [ ] Rotate credentials from development values
- [ ] Confirm no secret values are committed publicly
- [ ] Configure uptime monitoring for backend health endpoint
- [ ] Configure deployment notifications/alerts

## 6. Sign-off

- [ ] Backend deployment signed off
- [ ] Frontend deployment signed off
- [ ] PWA behavior signed off
- [ ] Production URLs documented
