# Task Tracking

Use this file as a manual progress board. Mark completed work with `[x]` and pending work with `[ ]`.

## 🧩 Phase 1 — Project Setup

**Description:** Foundation setup for framework, database connectivity, and initial domain model.

- [x] Spring Boot project setup
- [x] MySQL configuration
- [x] Basic entity creation
- [ ] Logging setup

## 🔐 Phase 2 — Authentication

**Description:** User authentication pipeline using Spring Security and database-backed credentials.

- [x] User entity
- [x] BCrypt password encoding
- [x] Login API
- [x] AuthenticationManager integration
- [x] CustomUserDetailsService

## 🔑 Phase 3 — JWT Security

**Description:** Stateless access control using signed JWT tokens and request filtering.

- [x] JWT token generation
- [x] JwtUtil implementation
- [x] JwtFilter
- [x] Token validation
- [ ] Refresh token system

## 👮 Phase 4 — Authorization

**Description:** Restrict endpoint access by role and apply least-privilege defaults.

- [x] Role field in user
- [x] Role extraction in JWT
- [x] ADMIN vs USER restriction
- [x] Secure /api/admin/**
- [ ] Method-level security (@PreAuthorize)

## 🚗 Phase 5 — Parking System

**Description:** Core parking business operations and ticket lifecycle management.

- [x] Vehicle entity
- [x] Parking slot management
- [x] Check-in API
- [x] Check-out API
- [x] Fee calculation
- [ ] Reservation system

## 📊 Phase 6 — Enhancements

**Description:** Usability, quality, and maintainability improvements after core functionality.

- [ ] Dashboard analytics
- [ ] API documentation (Swagger)
- [ ] Exception handling improvements
- [ ] Validation improvements

## 🚀 Phase 7 — Production Ready

**Description:** Deployment hardening, observability, and operational readiness.

- [ ] Docker setup
- [ ] CI/CD pipeline
- [ ] Logging & monitoring
- [ ] Rate limiting
- [ ] Security hardening

## 📈 Project Progress

- Completed Phases: **1 / 7**
- Current Phase: **Phase 6 — Enhancements**
- Next Goal: **Add Swagger/OpenAPI documentation**
