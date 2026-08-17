import { useMemo } from "react";
import { AlertTriangle, ArrowUpRight, BadgeDollarSign, Boxes, CircleDollarSign, ClipboardList, PackageCheck, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { StatusPill } from "../../components/ui/StatusPill";
import { useAppData } from "../../contexts/AppDataContext";
import { usePreferences } from "../../contexts/PreferencesContext";
import { buildDailySales, calculateAnalytics } from "../../utils/analytics";
import { formatCurrency, formatDate } from "../../utils/formatters";

export default function OverviewPage() {
  const { state } = useAppData();
  const { preferences } = usePreferences();
  const analytics = useMemo(() => calculateAnalytics(state, preferences.lowStockThreshold), [preferences.lowStockThreshold, state]);
  const dailySales = useMemo(() => buildDailySales(state.orders), [state.orders]);
  const maxSales = Math.max(...dailySales.map((day) => day.value), 1);
  const kpis = [
    { label: "Total revenue", value: formatCurrency(analytics.totalRevenue, preferences.currency), change: "+12.4%", icon: CircleDollarSign, tone: "teal" },
    { label: "Orders today", value: analytics.ordersToday, change: `${state.orders.length} total`, icon: ClipboardList, tone: "blue" },
    { label: "Avg. order", value: formatCurrency(analytics.averageOrderValue, preferences.currency), change: "+4.8%", icon: BadgeDollarSign, tone: "purple" },
    { label: "Low stock", value: analytics.lowStockProducts.length, change: "Needs attention", icon: AlertTriangle, tone: "orange" },
  ];

  return (
    <div className="page-stack">
      <PageHeader eyebrow="Sunday · Live overview" title="Good evening, team" description="Here’s what’s happening across inventory and sales today." action={<Link className="button button-primary" to="/dashboard/products">Manage products <ArrowUpRight size={17} /></Link>} />
      <section className="kpi-grid" aria-label="Key performance indicators">
        {kpis.map((kpi) => <article className="kpi-card" key={kpi.label}><div className={`metric-icon metric-${kpi.tone}`}><kpi.icon size={21} /></div><div><p>{kpi.label}</p><h2>{kpi.value}</h2><span>{kpi.change}</span></div></article>)}
      </section>
      <section className="dashboard-grid-large">
        <article className="panel sales-panel">
          <div className="panel-heading"><div><p className="eyebrow">Last 7 days</p><h2>Sales performance</h2></div><span className="trend-chip"><TrendingUp size={15} /> 12.4%</span></div>
          <div className="sales-total"><strong>{formatCurrency(dailySales.reduce((sum, day) => sum + day.value, 0), preferences.currency)}</strong><span>Gross sales</span></div>
          <div className="bar-chart" aria-label="Sales over the last seven days">
            {dailySales.map((day) => <div className="bar-column" key={day.label}><div className="bar-track"><span style={{ height: `${Math.max(5, (day.value / maxSales) * 100)}%` }} title={`${day.label}: ${formatCurrency(day.value)}`} /></div><small>{day.label}</small></div>)}
          </div>
        </article>
        <article className="panel low-stock-panel">
          <div className="panel-heading"><div><p className="eyebrow">Inventory alert</p><h2>Low stock</h2></div><Link to="/dashboard/products">View all</Link></div>
          <div className="stock-list">{analytics.lowStockProducts.slice(0, 5).map((product) => <div key={product.id}><span className="product-avatar">{product.name.slice(0, 2).toUpperCase()}</span><div><strong>{product.name}</strong><small>{product.sku}</small></div><span className={product.stock === 0 ? "stock-zero" : "stock-low"}>{product.stock} left</span></div>)}</div>
        </article>
      </section>
      <section className="dashboard-grid-small">
        <article className="panel recent-orders-panel">
          <div className="panel-heading"><div><p className="eyebrow">Latest activity</p><h2>Recent orders</h2></div><Link to="/dashboard/orders">All orders</Link></div>
          <div className="mini-table"><div className="mini-table-head"><span>Order</span><span>Customer</span><span>Date</span><span>Status</span><span>Total</span></div>{state.orders.slice(0, 5).map((order) => <div className="mini-table-row" key={order.id}><strong>{order.id}</strong><span>{order.customer}</span><span>{formatDate(order.date, { month: "short", day: "numeric" })}</span><span><StatusPill value={order.status} /></span><strong>{formatCurrency(order.total, preferences.currency)}</strong></div>)}</div>
        </article>
        <article className="panel quick-stats-panel"><p className="eyebrow">Catalog health</p><h2>At a glance</h2><div className="quick-stat"><span><Boxes size={18} /></span><div><strong>{state.products.length}</strong><small>Products</small></div></div><div className="quick-stat"><span><Users size={18} /></span><div><strong>{state.customers.length}</strong><small>Customers</small></div></div><div className="quick-stat"><span><PackageCheck size={18} /></span><div><strong>{state.products.reduce((sum, item) => sum + item.stock, 0)}</strong><small>Units on hand</small></div></div></article>
      </section>
    </div>
  );
}
