# Setup Guide

## Prerequisites

- Java 17
- Maven 3.9+
- MySQL 8+
- API client (Postman/Insomnia/cURL)

## 1. Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Default server URL:

```text
http://localhost:8080
```

## 2. Database Setup (MySQL)

Create database:

```sql
CREATE DATABASE smart_parking;
```

Set DB config in `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/smart_parking
spring.datasource.username=root
spring.datasource.password=<your_password>
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

Seed an admin user (BCrypt password hash required):

```sql
INSERT INTO users(username, password, role)
VALUES ('admin', '$2a$10$replace_with_bcrypt_hash_for_1234', 'ADMIN');
```

## 3. Postman Testing

### A. Login

`POST http://localhost:8080/api/auth/login`

```json
{
  "username": "admin",
  "password": "1234"
}
```

Copy the returned JWT.

### B. Call Protected APIs

Use header:

```text
Authorization: Bearer <token>
```

Recommended smoke test order:

1. `POST /api/admin/slots`
2. `POST /api/parking/check-in`
3. `POST /api/parking/check-out`
4. `GET /api/parking/available-slots`
5. `GET /api/parking/active`
6. `GET /api/parking/revenue`

## 4. Future Frontend Setup (Placeholder)

Frontend is not implemented yet. Planned flow:

1. Create frontend app (React recommended)
2. Configure API base URL to backend (`http://localhost:8080`)
3. Store JWT after login
4. Add Axios interceptor for bearer token injection
5. Add route guards for `ADMIN` and `USER`

See `docs/FRONTEND_PLAN.md` for details.

## 5. Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| 401 on login | Password hash mismatch | Recreate BCrypt hash and update `users.password` |
| 403 on admin endpoint | Token role is not `ADMIN` | Verify `users.role` and re-login |
| MySQL connection failure | Invalid DB credentials/URL | Correct datasource properties |
| Token works then expires | 1-hour token expiry | Re-authenticate (refresh token not implemented yet) |

## 🧠 System Maturity Level

**Intermediate**

Core backend functionality is complete for authentication/authorization and parking operations, while advanced production capabilities are still pending.
