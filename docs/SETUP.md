# Setup Guide

## Prerequisites

- Java 17
- Maven 3.9+
- MySQL 8+
- Postman (or any API client)

## 1. Database Setup

Create database:

```sql
CREATE DATABASE smart_parking;
```

Default app config (`backend/src/main/resources/application.properties`):

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/smart_parking
spring.datasource.username=root
spring.datasource.password=<your_password>
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

Create a default admin user (password must be BCrypt hash):

```sql
INSERT INTO users(username, password, role)
VALUES ('admin', '$2a$10$replace_with_bcrypt_hash_for_1234', 'ADMIN');
```

If needed, generate hash using the project `PasswordGenerator` helper.

## 2. Run the Backend

```bash
cd backend
mvn spring-boot:run
```

Application starts on:

```text
http://localhost:8080
```

## 3. Postman Testing

### Step A: Login

`POST http://localhost:8080/api/auth/login`

```json
{
  "username": "admin",
  "password": "1234"
}
```

Copy `token` from response.

### Step B: Set Authorization Header

For protected endpoints, add:

```text
Authorization: Bearer <token>
```

### Step C: Try Endpoints

- `POST /api/admin/slots` (ADMIN only)
- `POST /api/parking/check-in`
- `POST /api/parking/check-out`
- `GET /api/parking/available-slots`
- `GET /api/parking/active`
- `GET /api/parking/revenue`

## 4. Common Issues

| Issue | Likely Cause | Fix |
|---|---|---|
| 401 Invalid username or password | Wrong plain password or wrong BCrypt hash | Recreate BCrypt hash and update DB |
| 403 Forbidden | Role mismatch (`ADMIN` vs `USER`) | Verify `role` column in `users` table |
| DB connection failure | Wrong URL/credentials | Correct datasource properties |
