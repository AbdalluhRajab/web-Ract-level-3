import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, Moon, Package2, ShoppingBag, Sun, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useAppData } from "../contexts/AppDataContext";
import { useNotifications } from "../contexts/NotificationContext";
import { usePreferences } from "../contexts/PreferencesContext";
import { Modal } from "../components/ui/Modal";
import { landingPathForRole } from "../utils/permissions";

export function PublicLayout() {
  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { user, logout } = useAuth();
  const { state } = useAppData();
  const { showNotification } = useNotifications();
  const { preferences, updatePreferences } = usePreferences();
  const navigate = useNavigate();
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const destination = user ? landingPathForRole(user.role) : "/login";

  function confirmLogout() {
    logout();
    setLogoutOpen(false);
    setOpen(false);
    showNotification({ type: "success", message: "You have been logged out." });
    navigate("/", { replace: true });
  }

  return (
    <div className="public-shell">
      <header className="public-header">
        <Link to="/" className="brand" aria-label="StockFlow home"><span className="brand-mark"><Package2 size={21} /></span><span>Stock<span>Flow</span></span></Link>
        <button className="mobile-menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
        <nav className={open ? "public-nav open" : "public-nav"} aria-label="Primary navigation">
          <NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>Products</NavLink>
          {user?.role === "Customer" && <NavLink to="/customer" onClick={() => setOpen(false)}>My account</NavLink>}
        </nav>
        <div className="public-actions">
          <button className="icon-button" type="button" aria-label={`Use ${preferences.theme === "light" ? "dark" : "light"} theme`} onClick={() => updatePreferences({ theme: preferences.theme === "light" ? "dark" : "light" })}>{preferences.theme === "light" ? <Moon size={18} /> : <Sun size={18} />}</button>
          <Link className="cart-link" to="/cart" aria-label={`Cart with ${cartCount} items`}><ShoppingBag size={19} /><span>{cartCount}</span></Link>
          {user ? (
            <>
              <Link className="button button-primary button-small" to={destination}>{user.role === "Customer" ? "My account" : "Open workspace"}</Link>
              <button className="button button-ghost button-small" type="button" onClick={() => setLogoutOpen(true)}><LogOut size={16} /> Logout</button>
            </>
          ) : (
            <Link className="button button-primary button-small" to="/login">Sign in</Link>
          )}
        </div>
      </header>
      <main><Outlet /></main>
      <footer className="public-footer">
        <div><Link to="/" className="brand"><span className="brand-mark"><Package2 size={18} /></span><span>Stock<span>Flow</span></span></Link><p>Inventory clarity for growing teams.</p></div>
        <p>Advanced React capstone · Local demo data only</p>
      </footer>
      <Modal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        title="Log out?"
        description="Your local demo session will be cleared."
        confirmLabel="Logout"
        confirmTone="danger"
        onConfirm={confirmLogout}
      >
        <p>Are you sure you want to log out of the {user?.role || "current"} account?</p>
      </Modal>
    </div>
  );
}
