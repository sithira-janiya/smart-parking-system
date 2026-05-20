import { Navigate, Outlet } from "react-router-dom";
import {
  getRedirectPath,
  getUserRole,
  hasRequiredRole,
  isAuthenticated,
  UserRole,
} from "../utils/auth";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (!hasRequiredRole(allowedRoles)) {
    return <Navigate to={getRedirectPath(getUserRole())} replace />;
  }

  return <Outlet />;
}
