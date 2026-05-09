# Smart Parking System (Backend)

Spring Boot backend for parking operations with JWT authentication, role-based authorization, slot administration, and ticket-based billing.

## What's new

- Consolidated task list and deployment roadmap added to `docs/TASKS.md`.
- Core auth and parking flows implemented; next focus on refresh tokens, frontend UIs, and deployment automation.

## Features

- JWT login with Spring Security
- Role-based access control (ADMIN, USER)
- Parking check-in and check-out
- Parking slot management (admin)
- Ticket lifecycle with fee calculation
- Dashboard-style operational metrics (available slots, active vehicles, revenue)

## Tech Stack

| Layer       | Technology                   |
| ----------- | ---------------------------- |
| Language    | Java 17                      |
| Framework   | Spring Boot 3.2.x            |
| Security    | Spring Security, JWT, BCrypt |
| Persistence | Spring Data JPA, Hibernate   |
| Database    | MySQL                        |
| Build Tool  | Maven                        |

## Quick Start (local)

1. Configure DB in backend/src/main/resources/application.properties.
2. Start MySQL and ensure schema exists:
   ```sql
   CREATE DATABASE smart_parking;
   ```
3. Run backend locally for development:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
4. Call login endpoint to obtain JWT:

   ```http
   POST /api/auth/login
   Content-Type: application/json

   {
     "username": "admin",
     "password": "1234"
   }
   ```

5. Use returned JWT in `Authorization: Bearer <token>` for protected endpoints.

## Planned Future Steps (high level)

1. Local Docker + CI: Dockerize backend and frontend, add docker-compose for local E2E.
   - Commands:
     - `docker build -t smart-parking-backend ./backend`
     - `docker build -t smart-parking-frontend ./frontend`
     - `docker compose up --build`

2. Database Migrations: Add Flyway and migration scripts, run migrations in CI.
   - Commands:
     - `cd backend && mvn org.flywaydb:flyway-maven-plugin:migrate`

3. CI/CD & Staging Deploy: Add GitHub Actions to build, test, and push images; deploy to staging.
   - Commands: push to `main` branch to trigger CI; ensure workflows run `mvn -B -DskipTests=false verify` and `npm ci && npm run build`.

4. Production Hardening: Centralized logging, monitoring, secrets, and rate-limiting.

## Documentation Index

- [Developer Guide](docs/DEVELOPER_GUIDE.md)
- [API Reference](docs/API_REFERENCE.md)
- [Setup Guide](docs/SETUP.md)
- [Workflow](docs/WORKFLOW.md)
- [Task Tracking](docs/TASKS.md)
- [Contributing](docs/CONTRIBUTING.md)
- [Future Improvements](docs/FUTURE_IMPROVEMENTS.md)

---

If you want, I can:

- Add Dockerfiles for backend and frontend and open a PR.
- Scaffold Flyway migrations with initial schema file.
- Create a GitHub Actions CI workflow skeleton.
