# API Reference

Base URL: `http://localhost:8080`

## Authentication

### `POST /api/auth/login`

| Field | Value |
|---|---|
| Authorization | Public |
| Purpose | Authenticate user and return JWT token |

**Request**

```json
{
  "username": "admin",
  "password": "1234"
}
```

**Response (200)**

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

**Response (401)**

```json
{
  "error": "Invalid username or password"
}
```

---

## Parking APIs

### `POST /api/parking/check-in`

| Field | Value |
|---|---|
| Authorization | `USER` or `ADMIN` |
| Purpose | Create/resolve vehicle, reserve matching available slot, create active ticket |

**Request**

```json
{
  "plateNumber": "ABC-1234",
  "type": "CAR"
}
```

**Response (200)**

```json
{
  "id": 1,
  "plateNumber": "ABC-1234",
  "vehicleType": "CAR",
  "slotNumber": "A-01",
  "status": "ACTIVE",
  "checkInTime": "2026-04-30T10:15:30",
  "checkOutTime": null,
  "fee": null
}
```

### `POST /api/parking/check-out`

| Field | Value |
|---|---|
| Authorization | `USER` or `ADMIN` |
| Purpose | Complete active ticket, calculate fee, free slot |

**Request**

```json
{
  "plateNumber": "ABC-1234"
}
```

**Response (200)**

```json
{
  "id": 1,
  "plateNumber": "ABC-1234",
  "vehicleType": "CAR",
  "slotNumber": "A-01",
  "status": "COMPLETED",
  "checkInTime": "2026-04-30T10:15:30",
  "checkOutTime": "2026-04-30T12:05:10",
  "fee": 200.0
}
```

### `GET /api/parking/available-slots`

| Field | Value |
|---|---|
| Authorization | `USER` or `ADMIN` |
| Purpose | Get number of available slots |

**Response (200)**

```json
8
```

### `GET /api/parking/active`

| Field | Value |
|---|---|
| Authorization | `USER` or `ADMIN` |
| Purpose | Get number of active parked vehicles |

**Response (200)**

```json
3
```

### `GET /api/parking/revenue`

| Field | Value |
|---|---|
| Authorization | `USER` or `ADMIN` |
| Purpose | Get total accumulated revenue from completed tickets |

**Response (200)**

```json
1250.0
```

---

## Admin APIs

### `POST /api/admin/slots`

| Field | Value |
|---|---|
| Authorization | `ADMIN` |
| Purpose | Create new parking slot |

**Request**

```json
{
  "slotNumber": "A-01",
  "vehicleType": "CAR"
}
```

**Response (200)**

```json
{
  "id": 10,
  "slotNumber": "A-01",
  "status": "AVAILABLE",
  "vehicleType": "CAR"
}
```

### `GET /api/admin/slots`

| Field | Value |
|---|---|
| Authorization | `ADMIN` |
| Purpose | List all parking slots |

**Response (200)**

```json
[
  {
    "id": 10,
    "slotNumber": "A-01",
    "status": "AVAILABLE",
    "vehicleType": "CAR"
  }
]
```

### `DELETE /api/admin/slots/{id}`

| Field | Value |
|---|---|
| Authorization | `ADMIN` |
| Purpose | Delete parking slot by ID |

**Response (200)**

```json
"Slot deleted"
```

---

## Error Behavior

| Scenario | Status | Body |
|---|---|---|
| Validation failure | 400 | `{ "field": "message" }` |
| Not found resource | 404 | `{ "error": "..." }` |
| Auth failure | 401 | `{ "error": "Invalid username or password" }` |
| Unexpected server error | 500 | `{ "error": "Something went wrong" }` |
