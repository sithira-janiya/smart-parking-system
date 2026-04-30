# Workflow

## 1. Login Flow (JWT)

```text
Client -> /api/auth/login -> AuthController -> AuthService
       -> AuthenticationManager -> DaoAuthenticationProvider
       -> CustomUserDetailsService -> UserRepository (MySQL)
       -> BCrypt password match
       -> JwtUtil.generateToken(username, role)
       -> token returned to client
```

### Key Points

- Authentication is database-backed (no in-memory default user).
- Password check uses BCrypt through `DaoAuthenticationProvider`.
- JWT contains subject (`username`) and `role` claim.

## 2. Request Flow (Filter -> Controller)

```text
Incoming request
  -> SecurityFilterChain
  -> JwtFilter reads Authorization header
  -> JwtUtil validates token and extracts username/role
  -> SecurityContext is populated
  -> Access rules are evaluated
  -> Controller method executes (or 401/403)
```

### Access Rules

- `/api/auth/**`: public
- `/api/admin/**`: `ADMIN`
- `/api/parking/**`: `USER` or `ADMIN`

## 3. Check-In Flow

```text
POST /api/parking/check-in
  -> validate request (plate, type)
  -> find or create vehicle
  -> find first available slot by vehicle type
  -> mark slot OCCUPIED
  -> create ACTIVE ticket with checkInTime
  -> return TicketResponse
```

## 4. Check-Out Flow

```text
POST /api/parking/check-out
  -> find ACTIVE ticket by plate
  -> set checkOutTime
  -> compute parking duration (minimum 1 hour)
  -> calculate fee by vehicle type
  -> mark slot AVAILABLE
  -> mark ticket COMPLETED
  -> return TicketResponse
```

## 5. Fee Calculation Rules

| Vehicle Type | Hourly Rate |
|---|---|
| BIKE | 50 |
| CAR | 100 |
| VAN | 150 |

Minimum billed duration is 1 hour.
