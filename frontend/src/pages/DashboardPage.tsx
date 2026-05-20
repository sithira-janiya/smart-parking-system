import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import axiosInstance from "../api/axiosInstance";
import { getUserRole, getUsername, logoutUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

interface DashboardMetrics {
  availableSlots: number;
  activeVehicles: number;
  revenue: number;
}

const metricCards = [
  {
    key: "availableSlots",
    title: "Available Slots",
    icon: "🅿️",
    subtitle: "Free parking spaces",
  },
  {
    key: "activeVehicles",
    title: "Active Vehicles",
    icon: "🚗",
    subtitle: "Currently parked vehicles",
  },
  {
    key: "revenue",
    title: "Total Revenue",
    icon: "💰",
    subtitle: "Completed ticket income",
  },
] as const;

const featureCards = [
  {
    icon: "🚦",
    title: "Parking Flow",
    description: "Track parking check-ins and check-outs smoothly.",
  },
  {
    icon: "🧾",
    title: "Ticket Billing",
    description: "Monitor active tickets and completed parking revenue.",
  },
  {
    icon: "🛡️",
    title: "Secure Access",
    description: "JWT-based protected dashboard and admin routes.",
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  const [metrics, setMetrics] = useState<DashboardMetrics>({
    availableSlots: 0,
    activeVehicles: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    setLoading(true);
    setError("");

    try {
      const [availableSlotsResponse, activeVehiclesResponse, revenueResponse] =
        await Promise.all([
          axiosInstance.get<number>("/parking/available-slots"),
          axiosInstance.get<number>("/parking/active"),
          axiosInstance.get<number>("/parking/revenue"),
        ]);

      setMetrics({
        availableSlots: availableSlotsResponse.data,
        activeVehicles: activeVehiclesResponse.data,
        revenue: revenueResponse.data,
      });
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to load dashboard data.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  const formatMetricValue = (key: keyof DashboardMetrics) => {
    if (key === "revenue") {
      return `Rs. ${metrics.revenue.toFixed(2)}`;
    }

    return metrics[key];
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <Box className="page-shell">
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            spacing={3}
            sx={{ mb: 5 }}
          >
            <Box>
              <span className="hero-badge">📡 Live System Overview</span>

              <Typography
                variant="h3"
                sx={{
                  mt: 2,
                  fontWeight: 950,
                  color: "white",
                  fontSize: { xs: 36, md: 54 },
                  letterSpacing: "-1.5px",
                }}
              >
                Smart Parking Dashboard
              </Typography>

              <Typography sx={{ color: "#cbd5e1", mt: 1, fontSize: 17 }}>
                Welcome, {getUsername() || "User"} — monitor your parking
                operations in real time.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
              {getUserRole() === "ADMIN" && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Button
                    className="gradient-button"
                    onClick={() => navigate("/admin/slots")}
                    sx={{ px: 3, py: 1.2 }}
                  >
                    Admin Slots
                  </Button>
                </motion.div>
              )}

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                <Button
                  variant="outlined"
                  className="outline-button"
                  onClick={loadDashboard}
                  sx={{ px: 3, py: 1.2 }}
                >
                  Refresh
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                <Button
                  className="danger-button"
                  onClick={handleLogout}
                  sx={{ px: 3, py: 1.2 }}
                >
                  Logout
                </Button>
              </motion.div>
            </Stack>
          </Stack>
        </motion.div>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {metricCards.map((card, index) => (
              <Grid item xs={12} md={4} key={card.key}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.12, duration: 0.45 }}
                  whileHover={{ y: -10, scale: 1.025 }}
                >
                  <Card
                    className="soft-card"
                    sx={{
                      minHeight: 220,
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Box>
                          <Typography
                            sx={{
                              color: "#64748b",
                              fontWeight: 900,
                              letterSpacing: 0.3,
                            }}
                          >
                            {card.title}
                          </Typography>

                          <Typography
                            variant="h3"
                            sx={{
                              mt: 2,
                              fontWeight: 950,
                              color: "#0f172a",
                              fontSize: { xs: 44, md: 50 },
                            }}
                          >
                            {formatMetricValue(card.key)}
                          </Typography>

                          <Typography sx={{ color: "#64748b", mt: 1 }}>
                            {card.subtitle}
                          </Typography>
                        </Box>

                        <Box className="metric-icon">{card.icon}</Box>
                      </Stack>

                      <Box
                        sx={{
                          position: "absolute",
                          right: -35,
                          bottom: -45,
                          width: 155,
                          height: 155,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, rgba(37,99,235,0.16), rgba(6,182,212,0.16))",
                        }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {featureCards.map((card, index) => (
            <Grid item xs={12} md={4} key={card.title}>
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="glass-card" sx={{ borderRadius: 6, p: 2 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 38 }}>{card.icon}</Typography>

                    <Typography
                      variant="h6"
                      sx={{ color: "white", mt: 1, fontWeight: 950 }}
                    >
                      {card.title}
                    </Typography>

                    <Typography sx={{ color: "#94a3b8", mt: 1.1 }}>
                      {card.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
