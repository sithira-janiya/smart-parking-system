# Workflow

## 1. Login -> JWT -> Filter -> Controller

```text
Client
  -> POST /api/auth/login
  -> AuthController
  -> AuthService
  -> AuthenticationManager
  -> DaoAuthenticationProvider
  -> CustomUserDetailsService -> UserRepository -> MySQL(users)
  -> BCrypt password verification
  -> JwtUtil.generateToken(username, role)
  -> JWT returned to client
```

For subsequent requests:

```text
Client (Bearer token)
  -> SecurityFilterChain
  -> JwtFilter extracts username + role
  -> SecurityContext authenticated
  -> Authorization check
  -> Target controller method
```

## 2. Check-In Lifecycle

```text
POST /api/parking/check-in
  -> validate input (plateNumber, type)
  -> find existing vehicle OR create vehicle
  -> find first AVAILABLE slot for vehicle type
  -> update slot status to OCCUPIED
  -> create ACTIVE ticket with checkInTime
  -> return TicketResponse
```

## 3. Check-Out Lifecycle

```text
POST /api/parking/check-out
  -> locate ACTIVE ticket by plate number
  -> set checkOutTime
  -> compute duration (min 1 hour)
  -> calculate fee by vehicle type
  -> update slot status to AVAILABLE
  -> mark ticket COMPLETED
  -> return TicketResponse
```

## 4. Role-Based Access Flow

```text
Request arrives with JWT
  -> role claim extracted in JwtFilter
  -> authority mapped to ROLE_<role>
  -> SecurityConfig route rules applied:
       /api/auth/**     -> permitAll
       /api/admin/**    -> ROLE_ADMIN
       /api/parking/**  -> ROLE_USER or ROLE_ADMIN
```

If role/authority does not satisfy endpoint rule, access is rejected with `403`.

## 5. Pricing Rules

| Vehicle type | Rate per hour |
|---|---|
| BIKE | 50 |
| CAR | 100 |
| VAN | 150 |

## 🧠 System Maturity Level

**Intermediate**

Operational workflows are coherent and complete for backend APIs, but lifecycle extensions (refresh/logout/reservations) are still pending.
