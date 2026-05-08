# API Reference

Base URL: `http://localhost:8080`

## Authorization Header

For protected endpoints, send:

```http
Authorization: Bearer <jwt-token>
```

Example:

```http
GET /api/parking/available-slots HTTP/1.1
Host: localhost:8080
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

---

## Auth APIs

### `POST /api/auth/login`

| Field | Value |
|---|---|
| Role required | Public |
| Purpose | Authenticate user and return JWT |

**Request**

```json
{
  "username": "admin",
  "password": "1234"
}
```

**Response 200**

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

**Response 401**

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
| Role required | `USER` or `ADMIN` |
| Purpose | Check in vehicle, allocate slot, create active ticket |

**Headers**

```http
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request**

```json
{
  "plateNumber": "ABC-1234",
  "type": "CAR"
}
```

**Response 200**

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
| Role required | `USER` or `ADMIN` |
| Purpose | Complete active ticket, free slot, calculate fee |

**Headers**

```http
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request**

```json
{
  "plateNumber": "ABC-1234"
}
```

**Response 200**

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
| Role required | `USER` or `ADMIN` |
| Purpose | Return count of currently available slots |

**Headers**

```http
Authorization: Bearer <jwt-token>
```

**Response 200**

```json
8
```

### `GET /api/parking/active`

| Field | Value |
|---|---|
| Role required | `USER` or `ADMIN` |
| Purpose | Return number of active parking tickets |

**Headers**

```http
Authorization: Bearer <jwt-token>
```

**Response 200**

```json
3
```

### `GET /api/parking/revenue`

| Field | Value |
|---|---|
| Role required | `USER` or `ADMIN` |
| Purpose | Return cumulative revenue from completed tickets |

**Headers**

```http
Authorization: Bearer <jwt-token>
```

**Response 200**

```json
1250.0
```

---

## Admin APIs

### `POST /api/admin/slots`

| Field | Value |
|---|---|
| Role required | `ADMIN` |
| Purpose | Create a parking slot |

**Headers**

```http
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request**

```json
{
  "slotNumber": "A-01",
  "vehicleType": "CAR"
}
```

**Response 200**

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
| Role required | `ADMIN` |
| Purpose | List all parking slots |

**Headers**

```http
Authorization: Bearer <jwt-token>
```

**Response 200**

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
| Role required | `ADMIN` |
| Purpose | Delete a parking slot by ID |

**Headers**

```http
Authorization: Bearer <jwt-token>
```

**Response 200**

```json
"Slot deleted"
```

---

## Standard Error Responses

| Scenario | Status | Example body |
|---|---|---|
| Validation error | 400 | `{ "plateNumber": "Plate number is required" }` |
| Unauthorized | 401 | `{ "error": "Invalid username or password" }` |
| Forbidden | 403 | Spring Security default forbidden response |
| Not found | 404 | `{ "error": "No active ticket found" }` |
| Server error | 500 | `{ "error": "Something went wrong" }` |
