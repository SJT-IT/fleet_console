import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminDashboard";
import DealerDashboard from "../pages/DealerDashboard";
import { useAuth } from "../context/AuthContext";
import Unauthorized from "../pages/Unauthorized";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  // Not logged in
  if (!role) {
    return <Navigate to="/" replace />;
  }

  // Logged in but not allowed in THIS app
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dealer"
        element={
          <ProtectedRoute allowedRoles={["Dealer"]}>
            <DealerDashboard />
          </ProtectedRoute>
        }
      />

      <Route 
        path="/unauthorized" 
        element={<Unauthorized />} 
      />

    </Routes>
  );
}