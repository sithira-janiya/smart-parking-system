# Developer Guide

## Scope

This guide documents the current **backend-first** Smart Parking System implementation and the planned frontend integration path.

## Backend Architecture (Controller -> Service -> Repository)

The backend uses a layered Spring Boot design:

1. **Controller layer**: receives HTTP requests and returns API responses.
2. **Service layer**: contains business logic (authentication, parking lifecycle, pricing).
3. **Repository layer**: uses Spring Data JPA to query/persist MySQL entities.

### Current Modules

| Module | Purpose |
|---|---|
| `controller` | `AuthController`, `ParkingController`, `AdminController` |
| `service` | `AuthService`, `ParkingService` |
| `repository` | User, slot, vehicle, ticket data access |
| `entity` | JPA entities (`User`, `Vehicle`, `ParkingSlot`, `Ticket`) |
| `security` | JWT + Spring Security integration |
| `dto` | Request/response payload models |
| `exception` | Global exception handling |

## Security Flow (JWT + Filter + AuthenticationManager)

1. `POST /api/auth/login` enters `AuthController`.
2. `AuthService` calls `AuthenticationManager.authenticate(...)`.
3. `DaoAuthenticationProvider` delegates user loading to `CustomUserDetailsService`.
4. `CustomUserDetailsService` fetches the user from MySQL via `UserRepository`.
5. Password verification is handled by `BCryptPasswordEncoder`.
6. On success, `AuthService` generates a JWT using `JwtUtil` with username + role claim.
7. For protected APIs, `JwtFilter` reads `Authorization: Bearer <token>`, extracts claims, and sets the authenticated security context.

## Role-Based Authorization Flow

Configured in `SecurityConfig`:

- `/api/auth/**` -> public
- `/api/admin/**` -> `ADMIN`
- `/api/parking/**` -> `USER` or `ADMIN`

This is URL-level authorization with stateless JWT authentication.

## Database Interaction Flow

### Authentication path

`AuthController -> AuthService -> AuthenticationManager -> CustomUserDetailsService -> UserRepository -> MySQL(users)`

### Parking check-in path

`ParkingController -> ParkingService -> VehicleRepository + ParkingSlotRepository + TicketRepository -> MySQL`

### Parking check-out path

`ParkingController -> ParkingService -> TicketRepository + ParkingSlotRepository -> MySQL`

## Domain Model Summary

| Entity | Key fields | Notes |
|---|---|---|
| `User` | `id`, `username`, `password`, `role` | Password stored as BCrypt hash |
| `Vehicle` | `id`, `plateNumber`, `vehicleType` | Unique plate number |
| `ParkingSlot` | `id`, `slotNumber`, `status`, `vehicleType` | Tracks availability |
| `Ticket` | `id`, `vehicle`, `slot`, `checkInTime`, `checkOutTime`, `fee`, `status` | Active/completed lifecycle |

## Future Frontend Integration

Planned frontend will:

1. Authenticate via `/api/auth/login`
2. Persist access token client-side
3. Attach bearer token to API calls
4. Enforce route-level role restrictions in UI
5. Use dedicated dashboard/admin screens that align with `/api/parking/**` and `/api/admin/**`

See `docs/FRONTEND_PLAN.md` for the implementation plan.

## 🧠 System Maturity Level

**Intermediate**

Reason: core business APIs, JWT auth, and role restrictions are implemented and working, but production hardening items (refresh tokens, logout, OpenAPI docs, observability, CI/CD, deployment packaging) are still pending.
