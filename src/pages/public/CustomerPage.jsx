import { PackageCheck, ShoppingBag, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNotifications } from "../../contexts/NotificationContext";
import { useAppData } from "../../contexts/AppDataContext";
import { formatCurrency, formatDate } from "../../utils/formatters";

export default function CustomerPage() {
  const { user, logout } = useAuth();
  const { showNotification } = useNotifications();
  const navigate = useNavigate();
  const { state } = useAppData();
  const customerOrders = state.orders.filter((order) => order.customer === user.name);
  function handleLogout() {
    logout();
    showNotification({ type: "success", message: "You have been logged out." });
    navigate("/", { replace: true });
  }
  return <section className="customer-page"><div className="customer-hero"><span><UserRound size={24} /></span><div><p className="eyebrow">Customer area</p><h1>Hello, {user.name}</h1><p>This protected area is visible only to the Customer role.</p></div></div><div className="customer-grid"><article><ShoppingBag size={22} /><strong>{customerOrders.length}</strong><span>Orders</span></article><article><PackageCheck size={22} /><strong>{customerOrders.filter((order) => order.status === "Shipped").length}</strong><span>Shipped</span></article><article><span className="currency-icon">$</span><strong>{formatCurrency(customerOrders.reduce((sum, order) => sum + order.total, 0))}</strong><span>Total spend</span></article></div><div className="customer-orders"><h2>Recent orders</h2>{customerOrders.length ? customerOrders.map((order) => <div key={order.id}><strong>{order.id}</strong><span>{formatDate(order.date)}</span><span>{order.status}</span><strong>{formatCurrency(order.total)}</strong></div>) : <p>No orders found for this demo customer.</p>}<div className="customer-actions"><Link className="button button-primary" to="/products">Continue shopping</Link><button className="button button-ghost" type="button" onClick={handleLogout}><UserRound size={16} /> Logout</button></div></div></section>;
}
