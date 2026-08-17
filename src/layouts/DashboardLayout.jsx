import { useState } from "react";
import { BarChart3, Boxes, ChartNoAxesCombined, ChevronDown, CircleUserRound, ClipboardList, FolderTree, Gauge, LayoutDashboard, LogOut, Menu, Moon, Package2, Settings, Sun, Tag, Users, X, FlaskConical } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { usePreferences } from "../contexts/PreferencesContext";
import { Modal } from "../components/ui/Modal";
import { Can } from "../components/auth/Can";

const navSections = [
  { label: "Workspace", items: [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true, permission: "dashboard:view" },
    { to: "/dashboard/products", label: "Products", icon: Boxes, permission: "products:view" },
    { to: "/dashboard/orders", label: "Orders", icon: ClipboardList, permission: "orders:view" },
  ] },
  { label: "Directory", adminOnly: true, items: [
    { to: "/dashboard/customers", label: "Customers", icon: Users },
    { to: "/dashboard/categories", label: "Categories", icon: FolderTree },
    { to: "/dashboard/brands", label: "Brands", icon: Tag },
    { to: "/dashboard/users", label: "Users", icon: CircleUserRound },
  ] },
  { label: "Insights", items: [
    { to: "/dashboard/reports", label: "Reports", icon: BarChart3, permission: "reports:view" },
    { to: "/dashboard/analytics", label: "Analytics", icon: ChartNoAxesCombined, permission: "analytics:view" },
  ] },
];

export function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { user, logout } = useAuth();
  const { preferences, updatePreferences } = usePreferences();

  const closeNav = () => setMobileOpen(false);
  return (
    <div className="dashboard-shell">
      <aside className={mobileOpen ? "sidebar open" : "sidebar"}>
        <div className="sidebar-top">
          <Link to="/" className="brand brand-inverse"><span className="brand-mark"><Package2 size={21} /></span><span>Stock<span>Flow</span></span></Link>
          <button className="sidebar-close" type="button" onClick={closeNav} aria-label="Close menu"><X /></button>
        </div>
        <nav className="sidebar-nav" aria-label="Dashboard navigation">
          {navSections.map((section) => (
            (!section.adminOnly || user.role === "Admin") && <div className="nav-section" key={section.label}>
              <p>{section.label}</p>
              {section.items.map((item) => {
                const link = <NavLink key={item.to} to={item.to} end={item.end} onClick={closeNav}><item.icon size={18} /><span>{item.label}</span></NavLink>;
                return item.permission ? <Can permission={item.permission} key={item.to}>{link}</Can> : link;
              })}
            </div>
          ))}
          <Can permission="*">
            <div className="nav-section"><p>Advanced</p><NavLink to="/dashboard/lab" onClick={closeNav}><FlaskConical size={18} /><span>Challenge lab</span></NavLink></div>
          </Can>
        </nav>
        <div className="sidebar-bottom">
          <NavLink to="/dashboard/settings" onClick={closeNav}><Settings size={18} /><span>Settings</span></NavLink>
          <button type="button" onClick={() => setLogoutOpen(true)}><LogOut size={18} /><span>Log out</span></button>
        </div>
      </aside>
      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <button className="topbar-menu" type="button" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu /></button>
          <div className="workspace-name"><span><Gauge size={17} /></span><div><small>Workspace</small><strong>Northstar Retail</strong></div><ChevronDown size={15} /></div>
          <div className="topbar-actions">
            <button className="icon-button" type="button" aria-label="Toggle theme" onClick={() => updatePreferences({ theme: preferences.theme === "light" ? "dark" : "light" })}>{preferences.theme === "light" ? <Moon size={18} /> : <Sun size={18} />}</button>
            <div className="user-chip"><span>{user.name.split(" ").map((part) => part[0]).join("")}</span><div><strong>{user.name}</strong><small>{user.role}</small></div></div>
          </div>
        </header>
        <main className="dashboard-content"><Outlet /></main>
      </div>
      {mobileOpen && <button className="sidebar-scrim" onClick={closeNav} aria-label="Close menu" />}
      <Modal open={logoutOpen} onClose={() => setLogoutOpen(false)} title="Log out of StockFlow?" description="You can sign back in with any demo account." confirmLabel="Log out" confirmTone="danger" onConfirm={logout}>
        <p>Your locally saved inventory changes will remain available on this device.</p>
      </Modal>
    </div>
  );
}
