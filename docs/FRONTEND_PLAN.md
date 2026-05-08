# Frontend Plan

## Goal

Build a frontend for the existing backend APIs with role-aware navigation and secure JWT request handling.

## Recommended Stack

- React + TypeScript
- Vite
- React Router
- Axios
- UI library (MUI or Ant Design)
- Optional state layer (Redux Toolkit or Zustand)

## Planned Pages

### 1. Login Page

- Username/password form
- Submit to `POST /api/auth/login`
- Store JWT after success
- Redirect by role

### 2. Dashboard Page

- Show available slots (`/api/parking/available-slots`)
- Show active vehicles (`/api/parking/active`)
- Show total revenue (`/api/parking/revenue`)

### 3. Parking Management Page

- Check-in form (`/api/parking/check-in`)
- Check-out form (`/api/parking/check-out`)
- Ticket response rendering

### 4. Admin Slot Management Page

- Create slot (`POST /api/admin/slots`)
- List slots (`GET /api/admin/slots`)
- Delete slot (`DELETE /api/admin/slots/{id}`)

## JWT Integration Plan (Axios Interceptor)

1. Create a shared Axios instance.
2. Read token from storage.
3. Attach token automatically:

```ts
Authorization: Bearer <token>
```

4. On `401`, redirect to login and clear stale auth state.

## Protected Routes Concept

- Public: `/login`
- Protected (`USER` or `ADMIN`): parking and dashboard pages
- Admin-only: slot management pages

Example route guard strategy:

1. Decode token claims (`role`, `exp`)
2. Validate token expiry
3. Check role before route render
4. Redirect unauthorized users to safe route

## Suggested Frontend Milestones

1. Project bootstrap + login flow
2. Token persistence + interceptor
3. Dashboard metrics integration
4. Parking check-in/out integration
5. Admin module integration
6. UX hardening and error handling

## 🧠 System Maturity Level

**Beginner (frontend scope)**

No frontend implementation exists yet; this plan defines the baseline for first delivery.
