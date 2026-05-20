import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import axiosInstance from "../api/axiosInstance";
import { logoutUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

interface ParkingSlot {
  id: number;
  slotNumber: string;
  status: string;
  vehicleType: string;
}

interface CreateSlotForm {
  slotNumber: string;
  vehicleType: string;
}

export default function AdminSlotsPage() {
  const navigate = useNavigate();

  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const [form, setForm] = useState<CreateSlotForm>({
    slotNumber: "",
    vehicleType: "CAR",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadSlots = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.get<ParkingSlot[]>("/admin/slots");
      setSlots(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to load parking slots.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSlot = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.slotNumber.trim()) {
      setError("Slot number is required.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await axiosInstance.post("/admin/slots", {
        slotNumber: form.slotNumber.trim(),
        vehicleType: form.vehicleType,
      });

      setSuccess("Slot created successfully.");
      setForm({
        slotNumber: "",
        vehicleType: "CAR",
      });

      await loadSlots();
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to create slot.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSlot = async (id: number) => {
    const confirmed = window.confirm("Delete this parking slot?");
    if (!confirmed) return;

    setError("");
    setSuccess("");

    try {
      await axiosInstance.delete(`/admin/slots/${id}`);
      setSuccess("Slot deleted successfully.");
      await loadSlots();
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to delete slot.",
      );
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    loadSlots();
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
              <span className="hero-badge">🛠️ Administrator Workspace</span>

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
                Slot Management
              </Typography>

              <Typography sx={{ color: "#cbd5e1", mt: 1, fontSize: 17 }}>
                Create, monitor, and remove parking slots from one modern panel.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                <Button
                  className="gradient-button"
                  onClick={() => navigate("/dashboard")}
                  sx={{ px: 3, py: 1.2 }}
                >
                  Dashboard
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

        {success && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 3 }}>
            {success}
          </Alert>
        )}

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Card className="glass-card" sx={{ borderRadius: 7, mb: 4 }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography
                variant="h5"
                sx={{ color: "white", fontWeight: 950, mb: 1 }}
              >
                Create Parking Slot
              </Typography>

              <Typography sx={{ color: "#94a3b8", mb: 3 }}>
                Add a new slot by selecting slot number and supported vehicle
                type.
              </Typography>

              <form onSubmit={handleCreateSlot}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <TextField
                    className="dark-input"
                    label="Slot Number"
                    value={form.slotNumber}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        slotNumber: event.target.value,
                      }))
                    }
                    placeholder="A-01"
                    fullWidth
                    variant="filled"
                  />

                  <TextField
                    className="dark-input"
                    select
                    label="Vehicle Type"
                    value={form.vehicleType}
                    onChange={(event) =>
                      setForm((previous) => ({
                        ...previous,
                        vehicleType: event.target.value,
                      }))
                    }
                    fullWidth
                    variant="filled"
                  >
                    <MenuItem value="CAR">CAR</MenuItem>
                    <MenuItem value="BIKE">BIKE</MenuItem>
                    <MenuItem value="VAN">VAN</MenuItem>
                  </TextField>

                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Button
                      type="submit"
                      className="gradient-button"
                      disabled={saving}
                      sx={{ minWidth: 150, height: "100%" }}
                    >
                      {saving ? "Saving..." : "Create Slot"}
                    </Button>
                  </motion.div>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Typography variant="h5" sx={{ color: "white", fontWeight: 950 }}>
            Current Slots
          </Typography>

          <Button
            variant="outlined"
            className="outline-button"
            onClick={loadSlots}
          >
            Refresh Slots
          </Button>
        </Stack>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : slots.length === 0 ? (
          <Alert severity="info" sx={{ borderRadius: 3 }}>
            No parking slots found.
          </Alert>
        ) : (
          <Stack spacing={2.2}>
            {slots.map((slot, index) => (
              <motion.div
                key={slot.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -4, scale: 1.01 }}
              >
                <Card className="soft-card">
                  <CardContent sx={{ p: 3 }}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      justifyContent="space-between"
                      alignItems={{ xs: "flex-start", sm: "center" }}
                      spacing={2}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box className="metric-icon">🅿️</Box>

                        <Box>
                          <Typography variant="h5" sx={{ fontWeight: 950 }}>
                            {slot.slotNumber}
                          </Typography>

                          <Typography sx={{ color: "#64748b", mt: 0.5 }}>
                            Type: {slot.vehicleType} • Status: {slot.status}
                          </Typography>
                        </Box>
                      </Stack>

                      <Button
                        className="danger-button"
                        onClick={() => handleDeleteSlot(slot.id)}
                        sx={{ px: 3, py: 1 }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}
