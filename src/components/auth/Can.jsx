import { useAuth } from "../../contexts/AuthContext";
import { hasPermission } from "../../utils/permissions";

export function Can({ permission, children, fallback = null }) {
  const { user } = useAuth();
  return hasPermission(user, permission) ? children : fallback;
}
