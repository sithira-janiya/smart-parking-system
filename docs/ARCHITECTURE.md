# Architecture

## 1. System Architecture

The Smart Parking System is currently a **backend-centric monolith**:

- Spring Boot application exposes REST APIs
- MySQL stores operational and security data
- JWT secures stateless API access
- Role-based rules restrict admin and user capabilities

## 2. Layered Design

```text
Client (Postman / future frontend)
  -> Controller layer
  -> Service layer
  -> Repository layer
  -> MySQL
```

### Layer Responsibilities

| Layer | Responsibility |
|---|---|
| Controller | API contracts, request mapping, response return |
| Service | Business rules and transaction orchestration |
| Repository | DB access using Spring Data JPA |
| Security | Authentication, token processing, authorization |

## 3. Security Architecture

```text
Login:
  /api/auth/login
    -> AuthenticationManager
    -> DaoAuthenticationProvider
    -> CustomUserDetailsService
    -> BCrypt verification
    -> JWT issued

Authorized request:
  Authorization: Bearer <token>
    -> JwtFilter
    -> username/role claims extracted
    -> SecurityContext populated
    -> SecurityConfig role rules enforced
```

## 4. Data Flow (Text Diagram)

### Authentication Data Flow

```text
Client credentials -> AuthService -> UserRepository -> users table
                 -> JWT token (username + role) -> client
```

### Parking Check-In Data Flow

```text
check-in request
  -> vehicle lookup/create
  -> slot lookup by vehicle type and AVAILABLE status
  -> slot marked OCCUPIED
  -> ticket created as ACTIVE
  -> ticket response returned
```

### Parking Check-Out Data Flow

```text
check-out request
  -> active ticket lookup
  -> checkout timestamp + fee calculation
  -> slot marked AVAILABLE
  -> ticket marked COMPLETED
  -> ticket response returned
```

## 5. Database Architecture

Core entities:

- `users`
- `vehicles`
- `parking_slots`
- `tickets`

Relationships:

- One `Vehicle` can have many `Ticket` records over time.
- One `ParkingSlot` can be referenced by many `Ticket` records over time.
- `Ticket` links a vehicle-slot pair for a specific parking session.

## 6. Future Architecture Direction

Planned evolution:

1. Add React frontend consuming existing APIs
2. Introduce token refresh + logout strategy
3. Add API documentation (OpenAPI/Swagger)
4. Add deployment/observability components (Docker, CI/CD, monitoring)

## 🧠 System Maturity Level

**Intermediate**

Architecture is clean and functional for core use cases, but not yet production-ready due to missing platform and security lifecycle enhancements.
