import axiosInstance from "../api/axiosInstance";

export type UserRole = "ADMIN" | "USER";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

interface JwtPayload {
  sub?: string;
  username?: string;
  role?: string;
  authorities?: string[];
  exp?: number;
  [key: string]: unknown;
}

const TOKEN_KEY = "authToken";
const ROLE_KEY = "userRole";
const USERNAME_KEY = "username";

function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = atob(normalizedPayload);

    return JSON.parse(decodedPayload) as JwtPayload;
  } catch {
    return null;
  }
}

function normalizeRole(role?: string): UserRole | null {
  if (!role) return null;

  const cleanRole = role.replace("ROLE_", "").toUpperCase();

  if (cleanRole === "ADMIN") return "ADMIN";
  if (cleanRole === "USER") return "USER";

  return null;
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUserRole(): UserRole | null {
  return normalizeRole(localStorage.getItem(ROLE_KEY) || undefined);
}

export function getUsername(): string | null {
  return localStorage.getItem(USERNAME_KEY);
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeJwtPayload(token);

  if (!payload?.exp) return false;

  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  return payload.exp < currentTimeInSeconds;
}

export function isAuthenticated(): boolean {
  const token = getToken();

  if (!token) return false;

  if (isTokenExpired(token)) {
    logoutUser();
    return false;
  }

  return true;
}

export function hasRequiredRole(allowedRoles?: UserRole[]): boolean {
  if (!allowedRoles || allowedRoles.length === 0) return true;

  const currentRole = getUserRole();
  return currentRole ? allowedRoles.includes(currentRole) : false;
}

export async function loginUser(
  credentials: LoginCredentials,
  expectedRole?: UserRole,
): Promise<{ token: string; role: UserRole; username: string }> {
  const response = await axiosInstance.post<AuthResponse>(
    "/auth/login",
    credentials,
  );

  const { token } = response.data;

  if (!token) {
    throw new Error("Login response did not include a token.");
  }

  const payload = decodeJwtPayload(token);
  const role = normalizeRole(payload?.role);

  if (!role) {
    throw new Error("JWT token does not include a valid role.");
  }

  if (expectedRole && role !== expectedRole) {
    throw new Error(
      expectedRole === "ADMIN"
        ? "This account is not an administrator account."
        : "Administrator accounts must use the admin login page.",
    );
  }

  const username =
    payload?.sub || payload?.username || credentials.username.trim();

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLE_KEY, role);
  localStorage.setItem(USERNAME_KEY, username);

  return {
    token,
    role,
    username,
  };
}

export function logoutUser(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(USERNAME_KEY);
}

export function getRedirectPath(role?: string | null): string {
  const normalizedRole = normalizeRole(role || undefined);

  if (normalizedRole === "ADMIN") return "/admin/slots";
  if (normalizedRole === "USER") return "/dashboard";

  return "/login";
}
