# Smart Parking System (Backend)

Spring Boot backend for parking operations with JWT authentication, role-based authorization, slot administration, and ticket-based billing.

## Features

- JWT login with Spring Security
- Role-based access control (`ADMIN`, `USER`)
- Parking check-in and check-out
- Parking slot management (admin)
- Ticket lifecycle with fee calculation
- Dashboard-style operational metrics (available slots, active vehicles, revenue)

## Tech Stack

| Layer | Technology |
|---|---|
| Language | Java 17 |
| Framework | Spring Boot 3.2.x |
| Security | Spring Security, JWT, BCrypt |
| Persistence | Spring Data JPA, Hibernate |
| Database | MySQL |
| Build Tool | Maven |

## Quick Start

1. Configure DB in `backend/src/main/resources/application.properties`.
2. Start MySQL and ensure schema exists:
   ```sql
   CREATE DATABASE smart_parking;
   ```
3. Run backend:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
4. Call login endpoint:
   ```http
   POST /api/auth/login
   Content-Type: application/json

   {
     "username": "admin",
     "password": "1234"
   }
   ```
5. Use returned JWT in `Authorization: Bearer <token>`.

## Documentation Index

- [Developer Guide](docs/DEVELOPER_GUIDE.md)
- [API Reference](docs/API_REFERENCE.md)
- [Setup Guide](docs/SETUP.md)
- [Workflow](docs/WORKFLOW.md)
- [Task Tracking](docs/TASKS.md)
- [Contributing](docs/CONTRIBUTING.md)
- [Future Improvements](docs/FUTURE_IMPROVEMENTS.md)
