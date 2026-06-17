# Phase 9 Testing and Migration Runbook

## Goal

Finalize release readiness with testing, backup verification, and safe cutover.

## 1. Test Scope

### Backend

- API security test suite (`backend/tests/api.security.test.js`)
- PDF payload test suite (`backend/tests/pdf.controller.test.js`)

Run:

```bash
npm --prefix backend test
```

### Frontend

- Lint + build
- Jest smoke tests (`authStore`, `useRecords`)

Run:

```bash
npm --prefix frontend run lint
npm --prefix frontend run test
npm --prefix frontend run build
```

## 2. Pre-Cutover Backups

- [ ] Export current localStorage records from old app
- [ ] Save export file in secure location
- [ ] Snapshot MongoDB Atlas database before migration
- [ ] Record migration timestamp and operator

## 3. Migration Procedure

1. Freeze writes on legacy app for final migration window.
2. Run data import into MongoDB using agreed mapping.
3. Verify counts by module type:
   - sale
   - rent
   - property
4. Spot-check random records for numeric and date integrity.
5. Validate record search and delete behavior after import.

## 4. Acceptance Tests (UAT)

- [ ] Login with superadmin user
- [ ] Create sale record
- [ ] Create rent record
- [ ] Create property record
- [ ] Verify records list and search
- [ ] Verify soft delete hides record in active list
- [ ] Verify PWA offline page behavior

## 5. Performance and Security Checks

- [ ] API health response under expected latency
- [ ] Frontend page loads acceptable on mobile network
- [ ] JWT auth enforced on protected routes
- [ ] Non-superadmin access remains blocked
- [ ] Rate limiter active on auth and API endpoints

## 6. Rollback Plan

Trigger rollback if any critical failure occurs.

1. Point frontend env back to previous stable backend.
2. Restore MongoDB snapshot if data corruption is detected.
3. Re-enable legacy app access if production is unstable.
4. Announce rollback completion and start incident report.

## 7. Go-Live Checklist

- [ ] Migration verification complete
- [ ] UAT passed
- [ ] Security checks passed
- [ ] Monitoring active
- [ ] Support contact/owner assigned
- [ ] Release notes shared

## 8. Post-Go-Live Monitoring (24-48h)

- [ ] Track API errors and latency
- [ ] Track login failures and rate-limit spikes
- [ ] Track record creation/search/delete success rates
- [ ] Confirm no data drift vs migration baseline

## Sign-off

- [ ] Engineering sign-off
- [ ] Product/owner sign-off
- [ ] Operations sign-off
