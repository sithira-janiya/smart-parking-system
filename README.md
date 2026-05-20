# Smart Parking System

Full-stack Smart Parking System with a Spring Boot backend and React frontend for parking operations, JWT authentication, role-based authorization, slot administration, dashboard metrics, and ticket-based billing.

## What's new

- Frontend includes separate user and admin login routes.
- User login is available at `/login`.
- Admin login is available at `/admin/login`.
- Admin credentials are not displayed on the normal user login page.
- Core auth and parking flows are implemented.
- Flyway database migration support is configured for MySQL.

## Features

- JWT login with Spring Security
- Role-based access control with `ADMIN` and `USER`
- Separate frontend login pages for users and admins
- Parking check-in and check-out
- Parking slot management for admins
- Ticket lifecycle with fee calculation
- Dashboard-style operational metrics:
  - available slots
  - active vehicles
  - revenue
- Modern React frontend with protected routes

## Tech Stack

| Layer       | Technology                                         |
| ----------- | -------------------------------------------------- |
| Frontend    | React, TypeScript, Vite, MUI, Framer Motion, Axios |
| Backend     | Java 17, Spring Boot 3.2.x                         |
| Security    | Spring Security, JWT, BCrypt                       |
| Persistence | Spring Data JPA, Hibernate                         |
| Database    | MySQL                                              |
| Migration   | Flyway                                             |
| Build Tools | Maven, npm                                         |

## Project Structure

```text
smart-parking-system/
├── backend/
│   ├── src/main/java/com/parking/backend/
│   ├── src/main/resources/
│   └── pom.xml
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── docs/
└── README.md

Admin Login - U/N- admin1 P/W- admin123
```
