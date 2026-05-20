import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AdminSlotsPage from "./pages/AdminSlotsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { getRedirectPath, getUserRole, isAuthenticated } from "./utils/auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated() ? (
              <Navigate to={getRedirectPath(getUserRole())} replace />
            ) : (
              <LoginPage />
            )
          }
        />

        <Route element={<ProtectedRoute allowedRoles={["USER", "ADMIN"]} />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin/slots" element={<AdminSlotsPage />} />
        </Route>

        <Route
          path="/"
          element={
            <Navigate
              to={isAuthenticated() ? getRedirectPath(getUserRole()) : "/login"}
              replace
            />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
