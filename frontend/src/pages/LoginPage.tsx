import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { getRedirectPath, loginUser, LoginCredentials } from "../utils/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginCredentials>({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Username and password are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await loginUser(formData);
      navigate(getRedirectPath(response.role), { replace: true });
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="page-shell">
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 6 }}
          alignItems="center"
          justifyContent="center"
          sx={{
            minHeight: "calc(100vh - 64px)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box sx={{ flex: 1, width: "100%" }}>
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
            >
              <span className="hero-badge">
                🚘 Smart Parking Control System
              </span>

              <Typography
                variant="h1"
                sx={{
                  mt: 3,
                  fontWeight: 950,
                  lineHeight: 1.02,
                  color: "white",
                  fontSize: { xs: 42, sm: 54, md: 72 },
                  letterSpacing: "-2px",
                }}
              >
                Park smarter.
                <br />
                Manage faster.
              </Typography>

              <Typography
                sx={{
                  mt: 3,
                  color: "#cbd5e1",
                  fontSize: { xs: 16, md: 19 },
                  maxWidth: 590,
                  lineHeight: 1.75,
                }}
              >
                A modern parking dashboard for real-time slot availability,
                vehicle activity, ticket billing, admin controls, and secure
                role-based access.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mt: 4 }}
              >
                {[
                  ["⚡", "Fast Operations"],
                  ["🔐", "JWT Protected"],
                  ["📊", "Live Metrics"],
                ].map(([icon, title]) => (
                  <motion.div
                    key={title}
                    whileHover={{ y: -7, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 260 }}
                  >
                    <Card
                      className="glass-card"
                      sx={{
                        px: 2.5,
                        py: 2,
                        borderRadius: 5,
                        minWidth: 165,
                      }}
                    >
                      <Typography sx={{ fontSize: 30 }}>{icon}</Typography>
                      <Typography
                        sx={{ fontWeight: 900, color: "white", mt: 0.5 }}
                      >
                        {title}
                      </Typography>
                    </Card>
                  </motion.div>
                ))}
              </Stack>

              <Box sx={{ mt: 4 }}>
                <div className="image-panel">
                  <motion.div
                    className="floating-stat"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <Typography sx={{ color: "#bfdbfe", fontWeight: 900 }}>
                      Live Parking Experience
                    </Typography>
                    <Typography sx={{ color: "#e5e7eb", mt: 0.8 }}>
                      Designed for clean monitoring, quick decisions, and smooth
                      parking flow.
                    </Typography>
                  </motion.div>
                </div>
              </Box>
            </motion.div>
          </Box>

          <Box sx={{ flex: 0.78, width: "100%" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card
                className="glass-card"
                sx={{
                  borderRadius: 7,
                  p: { xs: 3, sm: 5 },
                  maxWidth: 500,
                  mx: "auto",
                }}
              >
                <Stack alignItems="center" spacing={2} sx={{ mb: 4 }}>
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Box
                      sx={{
                        width: 88,
                        height: 88,
                        borderRadius: 6,
                        display: "grid",
                        placeItems: "center",
                        fontSize: 44,
                        background: "linear-gradient(135deg, #2563eb, #06b6d4)",
                        boxShadow: "0 22px 48px rgba(37, 99, 235, 0.38)",
                      }}
                    >
                      🅿️
                    </Box>
                  </motion.div>

                  <Typography
                    variant="h4"
                    sx={{ color: "white", fontWeight: 950 }}
                  >
                    Welcome Back
                  </Typography>

                  <Typography sx={{ color: "#94a3b8", textAlign: "center" }}>
                    Sign in to continue your parking operations.
                  </Typography>
                </Stack>

                {error && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <Stack spacing={2.4}>
                    <TextField
                      className="dark-input"
                      fullWidth
                      label="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      disabled={loading}
                      variant="filled"
                    />

                    <TextField
                      className="dark-input"
                      fullWidth
                      label="Password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      disabled={loading}
                      variant="filled"
                    />

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button
                        fullWidth
                        type="submit"
                        size="large"
                        disabled={loading}
                        className="gradient-button"
                        sx={{ py: 1.65, mt: 1 }}
                      >
                        {loading ? (
                          <CircularProgress size={24} sx={{ color: "white" }} />
                        ) : (
                          "Launch Dashboard"
                        )}
                      </Button>
                    </motion.div>

                    <Box
                      sx={{
                        mt: 2,
                        p: 2.4,
                        borderRadius: 5,
                        background: "rgba(15, 23, 42, 0.72)",
                        border: "1px solid rgba(148, 163, 184, 0.18)",
                      }}
                    >
                      <Typography sx={{ color: "#e2e8f0", fontWeight: 900 }}>
                        Test Credentials
                      </Typography>

                      <Typography sx={{ color: "#94a3b8", mt: 1 }}>
                        User: <strong>user1</strong> / password123
                      </Typography>

                      <Typography sx={{ color: "#94a3b8" }}>
                        Admin: <strong>admin1</strong> / admin123
                      </Typography>
                    </Box>
                  </Stack>
                </form>
              </Card>
            </motion.div>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
