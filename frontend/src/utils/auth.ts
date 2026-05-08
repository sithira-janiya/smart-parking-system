import axiosInstance from "../api/axiosInstance";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  role: string;
}

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    "/auth/login",
    credentials,
  );
  const { token, role } = response.data;

  // Store token and role in localStorage
  localStorage.setItem("authToken", token);
  localStorage.setItem("userRole", role);

  return response.data;
};

export const logoutUser = (): void => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userRole");
};

export const getUserRole = (): string | null => {
  return localStorage.getItem("userRole");
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("authToken");
};

export const getRedirectPath = (role: string): string => {
  switch (role.toUpperCase()) {
    case "ADMIN":
      return "/admin/slots";
    case "USER":
      return "/dashboard";
    default:
      return "/login";
  }
};
