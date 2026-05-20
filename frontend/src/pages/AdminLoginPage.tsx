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
import { loginUser, LoginCredentials } from "../utils/auth";

export default function AdminLoginPage() {
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
      setError("Admin username and password are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await loginUser(formData, "ADMIN");
      navigate("/admin/slots", { replace: true });
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          "Admin login failed. Please check administrator credentials.",
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
              <span className="hero-badge">🛡️ Administrator Access</span>

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
                Control slots.
                <br />
                Secure operations.
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
                Dedicated administrator login for managing parking slots,
                monitoring operations, and accessing protected admin-only
                controls.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mt: 4 }}
              >
                {[
                  ["🛠️", "Slot Control"],
                  ["🔒", "Admin Only"],
                  ["📡", "Operations View"],
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
                      Protected Admin Portal
                    </Typography>
                    <Typography sx={{ color: "#e5e7eb", mt: 0.8 }}>
                      This route accepts only accounts with the ADMIN role.
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
                  border: "1px solid rgba(248, 113, 113, 0.25)",
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
                        background: "linear-gradient(135deg, #7c3aed, #ef4444)",
                        boxShadow: "0 22px 48px rgba(239, 68, 68, 0.28)",
                      }}
                    >
                      🛡️
                    </Box>
                  </motion.div>

                  <Typography
                    variant="h4"
                    sx={{ color: "white", fontWeight: 950 }}
                  >
                    Admin Login
                  </Typography>

                  <Typography sx={{ color: "#94a3b8", textAlign: "center" }}>
                    Sign in with an administrator account only.
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
                      label="Admin Username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      disabled={loading}
                      variant="filled"
                    />

                    <TextField
                      className="dark-input"
                      fullWidth
                      label="Admin Password"
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
                        className="danger-button"
                        sx={{ py: 1.65, mt: 1 }}
                      >
                        {loading ? (
                          <CircularProgress size={24} sx={{ color: "white" }} />
                        ) : (
                          "Open Admin Panel"
                        )}
                      </Button>
                    </motion.div>

                    <Box
                      sx={{
                        mt: 2,
                        p: 2.4,
                        borderRadius: 5,
                        background: "rgba(15, 23, 42, 0.72)",
                        border: "1px solid rgba(248, 113, 113, 0.2)",
                      }}
                    >
                      <Typography sx={{ color: "#fecaca", fontWeight: 900 }}>
                        Restricted Area
                      </Typography>

                      <Typography sx={{ color: "#94a3b8", mt: 1 }}>
                        Only users with the ADMIN role can continue from this
                        login screen.
                      </Typography>

                      <Typography
                        sx={{ color: "#64748b", mt: 0.8, fontSize: 13 }}
                      >
                        Normal users should sign in from /login.
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
