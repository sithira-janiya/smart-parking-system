# Consolidated Task List — Frontend · Backend · Database

Status legend:

- [x] completed
- [ ] pending

Summary: Core backend, authentication, and parking flows are implemented. Remaining work focuses on token lifecycle, API publishing, frontend UIs, and production deployment.

## **Completed Highlights**

- **Backend:** Spring Boot project, core entities, auth flow, parking check-in/out, fee calculation.
- **Database:** JPA entities and repositories for users, vehicles, parking_slots, tickets.
- **Security:** BCrypt passwords, JWT generation, JwtFilter and SecurityFilterChain integration, role-based URL restrictions.

---

## **Backend Tasks**

- **Completed:**
  - [x] Controller → Service → Repository layers
  - [x] AuthService, ParkingService core logic
  - [x] DTO request/response contracts

- **In Progress / Near-term:**
  - [ ] Refresh token implementation
    - Description: Add refresh token issuance, secure storage, and refresh endpoint.
    - Command to implement:
      - `cd backend && mvn -DskipTests=true test-compile`
      - Edit `AuthService`, add `RefreshToken` entity, repository and controller endpoint `/api/auth/refresh`.
    - After completion: run `mvn -DskipTests=false verify` and add integration test for refresh flow.
  - [ ] Logout / token revocation strategy
    - Description: Implement token blacklist or revoke-by-version in DB.
    - Command to implement: modify `SecurityConfig` and add `logout` endpoint; run `mvn -DskipTests=true test-compile` to compile.
    - After completion: document revocation approach in README and update tests.

- **Planned / Nice-to-have:**
  - [ ] Method-level authorization rollout (`@PreAuthorize`)
    - Command: `cd backend && mvn -DskipTests=true test-compile` then annotate controllers and run `mvn -q -DskipTests=false test`.

---

## **Database Tasks**

- **Completed:**
  - [x] Entity mappings, relationships, repositories

- **Planned / Critical:**
  - [ ] Database migrations (Flyway or Liquibase)
    - Description: Add migration scripts and enforce schema changes in CI/deploy.
    - Command to implement:
      - `cd backend && mvn org.flywaydb:flyway-maven-plugin:info`
      - Add `src/main/resources/db/migration/V1__init.sql` and run `mvn flyway:migrate` during CI.
    - After completion: include migration step in deployment pipeline.
  - [ ] Indexes and profiling
    - Command: run your DB explain profile queries; script suggestions saved to docs/DB_INDEXING.md.

---

## **Frontend Tasks**

- **Current state (repo present):** frontend skeleton, axios instance, pages and utils exist.

- **Immediate:**
  - [ ] Login UI and token storage
    - Description: Create login page, call `/api/auth/login`, store JWT in memory/HttpOnly cookie.
    - Command to implement:
      - `cd frontend && npm install`
      - `npm run dev`
    - After completion: verify login flow by calling backend and confirming protected route access.
  - [ ] Protected routing and role checks
    - Command: implement role-check in `utils/auth.ts`, run `npm run build` and test flows.

- **Feature UIs (next):**
  - [ ] Dashboard for slots, active vehicles, revenue
  - [ ] Admin slot management screens

---

## **Quality, Observability, and CI/CD**

- **Must-have before production:**
  - [ ] Dockerize backend and frontend
    - Command: in root make `docker-compose.yml` and run `docker compose up --build`.
    - After completion: test end-to-end locally and push images to registry.
  - [ ] CI pipeline (build, test, migrate, image push)
    - Command: Add GitHub Actions workflow `.github/workflows/ci.yml` that runs `mvn -B -DskipTests=false verify` and `npm ci && npm run build`.
  - [ ] Centralized logging and monitoring (AppInsights/ELK/Prometheus)

---

## **Deployment Roadmap (phased)**

1. Phase: Local CI & Docker — Build images and run full stack locally.
   - Tasks: Dockerize services, add `docker-compose.yml`.
   - Commands:
     - `docker build -t smart-parking-backend ./backend`
     - `docker build -t smart-parking-frontend ./frontend`
     - `docker compose up --build`
   - Completion check: E2E flows (login, check-in/out) pass in local compose network.

2. Phase: Managed DB & Migrations — Add Flyway and move DB to managed service.
   - Tasks: Add Flyway scripts, update application.properties with managed DB.
   - Command: `mvn flyway:migrate` (CI step)
   - Completion check: migrations applied in staging.

3. Phase: CI/CD and Image Registry — Automate build, test, and deploy.
   - Tasks: GitHub Actions, container registry push, deployment manifest (K8s/Container Apps/App Service).
   - Command: push commit to `main` to trigger CI.
   - Completion check: deployment to staging succeeded and smoke tests pass.

4. Phase: Production Hardening — Logging, monitoring, rate limiting, secrets.
   - Tasks: Integrate monitoring, WAF rules, secret management.
   - Completion check: production runbooks and alerting configured.

---

## **How to use this file**

- Tasks marked with `[x]` are complete. Use the commands beside each planned task to implement and verify.
- After finishing a task, update this file and mark the item `[x]`. When a phase has all items checked, mark the phase complete in PR description.

---

If you want, I can now: update documentation files in-place, create Dockerfiles, or scaffold Flyway scripts.
