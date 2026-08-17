import { ShieldX } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { landingPathForRole } from "../../utils/permissions";

export default function UnauthorizedPage() {
  const { user } = useAuth();
  return <section className="simple-state full-page-state"><ShieldX size={46} /><p className="eyebrow">403 · Access denied</p><h1>This area isn’t available for your role.</h1><p>StockFlow blocks unauthorized pages and actions through the same permission service.</p><Link className="button button-primary" to={user ? landingPathForRole(user.role) : "/login"}>Go to your workspace</Link></section>;
}
