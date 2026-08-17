import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { hasPermission } from "../../utils/permissions";

export function ProtectedRoute({ permission }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (permission && !hasPermission(user, permission)) return <Navigate to="/unauthorized" replace />;
  return <Outlet />;
}
