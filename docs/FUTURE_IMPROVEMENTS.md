# Future Improvements

## 1. Refresh Tokens

- Add short-lived access token + long-lived refresh token model
- Store refresh tokens securely (DB or cache) with rotation
- Implement `/api/auth/refresh`

## 2. Logout System

- Add token revocation strategy (blacklist/versioning)
- Implement `/api/auth/logout`
- Support logout from all sessions

## 3. Payment Integration

- Integrate payment gateway for ticket settlement
- Store payment transaction metadata
- Add payment status to ticket response

## 4. Frontend Integration

- Define versioned API contract for frontend clients
- Add CORS policy by environment
- Publish a frontend onboarding guide with auth + token refresh handling

## Additional Candidates

- OpenAPI/Swagger docs generation
- Reservation and pre-booking support
- Audit logs for admin operations
- Metrics and alerting integration
