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

  const handleCreateSlot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
            Admin Slot Management
          </Typography>
          <Typography color="text.secondary">
            Create, view, and delete parking slots
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => navigate("/dashboard")}>
            Dashboard
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

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Create Parking Slot
          </Typography>

          <form onSubmit={handleCreateSlot}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Slot Number"
                value={form.slotNumber}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    slotNumber: e.target.value,
                  }))
                }
                placeholder="A-01"
                fullWidth
              />

              <TextField
                select
                label="Vehicle Type"
                value={form.vehicleType}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    vehicleType: e.target.value,
                  }))
                }
                fullWidth
              >
                <MenuItem value="CAR">CAR</MenuItem>
                <MenuItem value="BIKE">BIKE</MenuItem>
                <MenuItem value="VAN">VAN</MenuItem>
              </TextField>

              <Button
                type="submit"
                variant="contained"
                disabled={saving}
                sx={{ minWidth: 140 }}
              >
                {saving ? "Saving..." : "Create"}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>

      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Parking Slots
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : slots.length === 0 ? (
        <Alert severity="info">No parking slots found.</Alert>
      ) : (
        <Stack spacing={2}>
          {slots.map((slot) => (
            <Card key={slot.id}>
              <CardContent>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  spacing={2}
                >
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {slot.slotNumber}
                    </Typography>
                    <Typography color="text.secondary">
                      Type: {slot.vehicleType} | Status: {slot.status}
                    </Typography>
                  </Box>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteSlot(slot.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
}
