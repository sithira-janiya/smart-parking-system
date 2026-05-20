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
import axiosInstance from "../api/axiosInstance";
import { getUsername, logoutUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

interface DashboardMetrics {
  availableSlots: number;
  activeVehicles: number;
  revenue: number;
}

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

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Smart Parking Dashboard
          </Typography>
          <Typography color="text.secondary">
            Welcome, {getUsername() || "User"}
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={loadDashboard}>
            Refresh
          </Button>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="text.secondary">Available Slots</Typography>
                <Typography variant="h3" fontWeight="bold">
                  {metrics.availableSlots}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="text.secondary">Active Vehicles</Typography>
                <Typography variant="h3" fontWeight="bold">
                  {metrics.activeVehicles}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="text.secondary">Total Revenue</Typography>
                <Typography variant="h3" fontWeight="bold">
                  Rs. {metrics.revenue.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
