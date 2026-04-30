# Developer Guide

## Architecture Overview

The backend follows a layered Spring Boot architecture:

1. **Controller layer**: HTTP API endpoints (`/api/auth`, `/api/parking`, `/api/admin`)
2. **Service layer**: business logic for auth and parking operations
3. **Repository layer**: JPA data access for users, vehicles, slots, and tickets
4. **Security layer**: JWT, request filtering, authentication provider configuration
5. **Persistence layer**: MySQL with Hibernate/JPA entities

## Folder Structure

```text
backend/src/main/java/com/parking/backend
├── controller
│   ├── AuthController.java
│   ├── ParkingController.java
│   └── AdminController.java
├── service
│   ├── AuthService.java
│   └── ParkingService.java
├── security
│   ├── SecurityConfig.java
│   ├── CustomUserDetailsService.java
│   ├── JwtFilter.java
│   └── JwtUtil.java
├── repository
│   ├── UserRepository.java
│   ├── VehicleRepository.java
│   ├── ParkingSlotRepository.java
│   └── TicketRepository.java
├── entity
│   ├── User.java
│   ├── Vehicle.java
│   ├── ParkingSlot.java
│   ├── Ticket.java
│   ├── VehicleType.java
│   └── SlotStatus.java
├── dto
│   ├── AuthRequest.java
│   ├── CheckInRequest.java
│   ├── CheckOutRequest.java
│   ├── AdminSlotRequest.java
│   └── response
│       ├── AuthResponse.java
│       └── TicketResponse.java
└── exception
    ├── GlobalExceptionHandler.java
    └── ResourceNotFoundException.java
```

## Core Services

| Service | Responsibility |
|---|---|
| `AuthService` | Validates credentials via `AuthenticationManager`, generates JWT |
| `ParkingService` | Handles check-in, check-out, slot status transitions, fee calculation |

## Security Components

| Component | Responsibility |
|---|---|
| `SecurityConfig` | Configures filter chain, endpoint access rules, BCrypt, auth provider |
| `CustomUserDetailsService` | Loads users from MySQL by username for authentication |
| `JwtUtil` | Generates token and extracts claims (username, role) |
| `JwtFilter` | Reads bearer token, validates claims, sets `SecurityContext` |

## JWT + Role-Based Flow

1. User calls `POST /api/auth/login`.
2. `AuthenticationManager` authenticates using DB user + BCrypt hash.
3. `AuthService` generates JWT including role claim.
4. Client sends token in `Authorization: Bearer <token>`.
5. `JwtFilter` extracts username/role and builds authenticated context.
6. Security rules enforce access:
   - `/api/auth/**` → public
   - `/api/admin/**` → `ADMIN`
   - `/api/parking/**` → `USER` or `ADMIN`

## Data Model Notes

- `User`: stores `username`, BCrypt `password`, and `role`
- `Vehicle`: unique `plateNumber` + `vehicleType`
- `ParkingSlot`: `slotNumber`, `status`, `vehicleType`
- `Ticket`: links `Vehicle` + `ParkingSlot`, tracks in/out times, fee, and status
