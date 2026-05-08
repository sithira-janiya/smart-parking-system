# Task Tracking

Status legend:

- `[x]` completed
- `[ ]` pending

Progress rule: a phase is counted as completed only when **all tasks in that phase** are checked.

## 🧩 Phase 1 — Project Setup

**Description:** Base platform and project foundation.

- [x] Spring Boot project setup
- [x] MySQL configuration
- [x] Basic entity creation
- [ ] Structured logging setup (profiles/levels/appender strategy)

## 🔐 Phase 2 — Authentication

**Description:** User login and credential verification.

- [x] User entity and repository lookup
- [x] BCrypt password encoder integration
- [x] Login API (`/api/auth/login`)
- [x] AuthenticationManager + DaoAuthenticationProvider integration
- [x] CustomUserDetailsService with DB-backed user loading

## 🔑 Phase 3 — JWT Security

**Description:** Stateless token-based security.

- [x] JWT generation on successful login
- [x] JwtUtil implementation (username + role claims)
- [x] JwtFilter integration in SecurityFilterChain
- [x] Token validation in request path
- [ ] Refresh token system
- [ ] Logout mechanism (token revocation/invalidation strategy)

## 👮 Phase 4 — Authorization

**Description:** Role-based access control by endpoint and method.

- [x] Role field in user model
- [x] Role extraction and authority mapping from JWT
- [x] ADMIN vs USER URL-level restriction
- [x] `/api/admin/**` secured for ADMIN
- [ ] Method-level authorization (`@PreAuthorize`) rollout

## 🚗 Phase 5 — Parking Core

**Description:** Core parking operations and ticket lifecycle.

- [x] Vehicle entity and persistence
- [x] Parking slot management APIs
- [x] Check-in API and ticket activation
- [x] Check-out API and ticket completion
- [x] Fee calculation by vehicle type and duration
- [ ] Reservation/pre-booking system

## 📊 Phase 6 — Quality & Platform Enhancements

**Description:** Documentation, resilience, and API quality upgrades.

- [ ] Swagger / OpenAPI integration
- [x] Global exception handling baseline
- [ ] Validation layer improvements (standardized payload + deeper business validation)
- [ ] Dashboard analytics expansion

## 🚀 Phase 7 — Production Readiness

**Description:** Deployability, operations, and hardening.

- [ ] Docker setup
- [ ] CI/CD pipeline
- [ ] Centralized logging and monitoring
- [ ] Rate limiting
- [ ] Security hardening checklist

---

## 🖥 Backend Tasks

- [x] Layered architecture (Controller -> Service -> Repository)
- [x] Auth and parking business services
- [x] DTO-based request/response contracts
- [ ] Swagger/OpenAPI publishing
- [ ] Validation and error contract standardization

## 🗄 Database Tasks

- [x] Core schema via JPA entities (`users`, `vehicles`, `parking_slots`, `tickets`)
- [x] Repository interfaces for all core entities
- [x] Relational mapping for ticket-vehicle-slot associations
- [ ] Migration tooling (Flyway/Liquibase)
- [ ] Index tuning and performance profiling

## 🌐 Frontend Tasks (future)

- [ ] Frontend project bootstrap
- [ ] Login UI and token storage flow
- [ ] Dashboard UI for slot/vehicle/revenue metrics
- [ ] Admin slot management screens
- [ ] Protected routing by role (ADMIN/USER)

## 🔐 Security Tasks

- [x] Spring Security filter chain configuration
- [x] BCrypt password verification
- [x] JWT login flow
- [x] Role-based authorization (ADMIN vs USER)
- [ ] Refresh token implementation
- [ ] Logout/token invalidation mechanism
- [ ] Security hardening (headers, key management, audit trail)

---

## 📈 Project Progress

- Completed Phases: **1 / 7** (Phase 2 complete)
- Current Phase: **Phase 3 — JWT Security**
- Next Goal: **Implement refresh token + logout mechanism to complete Phase 3**

## 🧠 System Maturity Level

**Intermediate**

The system has working authentication, authorization, and core parking workflows, but key production-grade capabilities (refresh/logout, OpenAPI, deployment/ops hardening) are still pending.
