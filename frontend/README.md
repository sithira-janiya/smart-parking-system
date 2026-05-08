# Login Page Frontend - Smart Parking System

This is the React + TypeScript + Vite frontend for the Smart Parking System, featuring a complete login page with JWT authentication.

## Features

✅ **Login Page**

- Username/password form with Material-UI styling
- Real-time form validation
- Submit to `POST /api/auth/login`
- JWT token storage in localStorage
- Role-based redirection (ADMIN → `/admin/slots`, USER → `/dashboard`)

✅ **Axios Interceptor**

- Automatic JWT token attachment to all requests
- 401 error handling with automatic logout and redirect to login

✅ **TypeScript Support**

- Fully typed components and utilities
- Type-safe API calls

✅ **Responsive Design**

- Mobile-friendly UI
- Material-UI components

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   └── LoginPage.tsx          # Login form component
│   ├── api/
│   │   └── axiosInstance.ts       # Axios instance with interceptors
│   ├── utils/
│   │   └── auth.ts                # Auth utility functions
│   ├── App.tsx                    # Main app component with routing
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
├── index.html                     # HTML template
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies
└── .env                          # Environment variables
```

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Step 1: Install Dependencies

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

### Step 2: Configure Backend URL

The `.env` file is already configured with the default backend URL:

```
VITE_API_URL=http://localhost:8080/api
```

If your backend runs on a different URL, update `.env` accordingly.

### Step 3: Ensure Backend is Running

Make sure the backend is running on `http://localhost:8080`. You can start it from the `backend/` directory:

```bash
cd backend
./mvnw spring-boot:run
```

Or on Windows:

```bash
cd backend
mvnw.cmd spring-boot:run
```

### Step 4: Start the Frontend Development Server

From the `frontend/` directory:

```bash
npm run dev
```

The development server will automatically open in your browser at `http://localhost:3000`.

## How to Test the Login Page

### Demo Credentials

The login form displays demo credentials on the page:

**User Login:**

- Username: `user1`
- Password: `password123`

**Admin Login:**

- Username: `admin1`
- Password: `admin123`

### Testing Steps

1. **Start Backend** (if not already running):

   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

2. **Start Frontend**:

   ```bash
   cd frontend
   npm run dev
   ```

3. **Open Browser** at `http://localhost:3000` (should open automatically)

4. **Test Login**:
   - Enter credentials from above
   - Click "Sign In"
   - On successful login:
     - JWT token is stored in `localStorage` under `authToken`
     - User role is stored in `localStorage` under `userRole`
     - You'll be redirected based on role:
       - **USER** → `/dashboard` (not implemented yet, will show 404)
       - **ADMIN** → `/admin/slots` (not implemented yet, will show 404)

5. **Test JWT Interceptor**:
   - Open browser DevTools → Application → Storage → Local Storage
   - You'll see `authToken` and `userRole` values
   - All API requests will automatically include the JWT token in the Authorization header

6. **Test 401 Handling**:
   - Clear the `authToken` from localStorage in DevTools
   - Try to access any protected route
   - You'll be automatically redirected to `/login`

### Testing Error Cases

- **Invalid Credentials**:
  - Try username: `wronguser`, password: `wrongpass`
  - You should see an error message: "Login failed. Please check your credentials."

- **Empty Fields**:
  - Try submitting with empty fields
  - You should see: "Username and password are required"

## Build for Production

To build the frontend for production:

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

## Key Features Implemented

### ✅ Login Form

- Clean Material-UI design
- Username and password inputs
- Form validation
- Loading state during submission

### ✅ JWT Storage

- Token stored in `localStorage` after successful login
- Role stored for role-based redirection
- Secure storage ready for future persistence

### ✅ Axios Interceptor

- **Request Interceptor**: Automatically attaches JWT token to all requests
- **Response Interceptor**: Handles 401 errors by clearing stored tokens and redirecting to login

### ✅ Role-Based Redirection

- Admin users redirect to `/admin/slots` (placeholder for admin dashboard)
- Regular users redirect to `/dashboard` (placeholder for user dashboard)
- Failed login stays on login page with error message

### ✅ Error Handling

- Backend error messages displayed to user
- Network error handling
- Graceful error messages

## Next Steps (Not Yet Implemented)

The following features are planned but not yet implemented:

1. Dashboard Page - Show available slots and stats
2. Parking Management Page - Check-in/out forms
3. Admin Slot Management Page - Create/delete slots
4. Protected Route Guards - Prevent unauthorized page access
5. Profile/Logout Feature - Manage user session

## Environment Variables

| Variable       | Default                     | Description          |
| -------------- | --------------------------- | -------------------- |
| `VITE_API_URL` | `http://localhost:8080/api` | Backend API base URL |

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Material-UI (MUI)** - UI component library
- **Emotion** - CSS-in-JS styling

## Troubleshooting

### Frontend won't start

- Ensure Node.js is installed: `node --version`
- Delete `node_modules` and `.lockfile`, then reinstall: `npm install`

### Can't connect to backend

- Verify backend is running on `http://localhost:8080`
- Check `VITE_API_URL` in `.env` matches your backend URL
- Check browser console for CORS errors

### Login always fails

- Verify backend has test users (user1/password123, admin1/admin123)
- Check backend logs for errors
- Open browser DevTools to see the API response

### CORS Errors

- The backend must have CORS configured to allow requests from `http://localhost:3000`
- Check [backend/README.md](../backend/README.md) or [SETUP.md](../docs/SETUP.md) for CORS configuration

## API Contract

### Login Endpoint

**Request:**

```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "user1",
  "password": "password123"
}
```

**Success Response (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "USER"
}
```

**Error Response (401):**

```json
{
  "message": "Invalid credentials"
}
```

## License

This project is part of the Smart Parking System. See [CONTRIBUTING.md](../docs/CONTRIBUTING.md) for more information.
