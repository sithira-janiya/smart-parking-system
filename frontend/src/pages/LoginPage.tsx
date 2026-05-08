import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Stack,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { loginUser, LoginCredentials, getRedirectPath } from "../utils/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!formData.username.trim() || !formData.password.trim()) {
        setError("Username and password are required");
        setLoading(false);
        return;
      }

      const response = await loginUser(formData);
      const redirectPath = getRedirectPath(response.role);

      // Redirect based on role
      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Card
          sx={{
            width: "100%",
            padding: 4,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          {/* Header */}
          <Stack alignItems="center" spacing={2} sx={{ marginBottom: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 56,
                height: 56,
                borderRadius: "50%",
                backgroundColor: "#1976d2",
              }}
            >
              <LockOutlinedIcon sx={{ color: "white", fontSize: 32 }} />
            </Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
              Smart Parking
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Sign in to your account
            </Typography>
          </Stack>

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Enter your username"
                variant="outlined"
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Enter your password"
                variant="outlined"
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                disabled={loading}
                sx={{
                  marginTop: 2,
                  padding: 1.5,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Demo Credentials Info */}
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: "#f5f5f5",
                  borderRadius: 1,
                  marginTop: 2,
                }}
              >
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  Demo Credentials:
                </Typography>
                <Typography variant="caption" display="block">
                  User: <strong>user1</strong> | Password:{" "}
                  <strong>password123</strong>
                </Typography>
                <Typography variant="caption" display="block">
                  Admin: <strong>admin1</strong> | Password:{" "}
                  <strong>admin123</strong>
                </Typography>
              </Box>
            </Stack>
          </form>
        </Card>
      </Box>
    </Container>
  );
}
