import { useMemo } from "react";
import { Award, BadgeDollarSign, PackageOpen, Users } from "lucide-react";
import { PageHeader } from "../../components/ui/PageHeader";
import { useAppData } from "../../contexts/AppDataContext";
import { usePreferences } from "../../contexts/PreferencesContext";
import { calculateAnalytics, categoryInventory } from "../../utils/analytics";
import { formatCurrency } from "../../utils/formatters";

export default function AnalyticsPage() {
  const { state } = useAppData();
  const { preferences } = usePreferences();
  const data = useMemo(() => calculateAnalytics(state, preferences.lowStockThreshold), [preferences.lowStockThreshold, state]);
  const categories = useMemo(() => categoryInventory(state.products), [state.products]);
  const totalValue = categories.reduce((sum, item) => sum + item.value, 0) || 1;
  return <div className="page-stack"><PageHeader eyebrow="Lazy-loaded module" title="Analytics" description="Derived insight calculated from raw product, customer, and order records." /><section className="insight-grid"><article><Award size={22} /><p>Best seller</p><h2>{data.bestSellingProduct?.name || "—"}</h2><span>{data.bestSellingUnits} units sold</span></article><article><Users size={22} /><p>Top customer</p><h2>{data.topCustomer?.name || "—"}</h2><span>{formatCurrency(data.topCustomerSpend, preferences.currency)} spend</span></article><article><BadgeDollarSign size={22} /><p>Average order</p><h2>{formatCurrency(data.averageOrderValue, preferences.currency)}</h2><span>Excludes refunds</span></article><article><PackageOpen size={22} /><p>Units on hand</p><h2>{state.products.reduce((sum, item) => sum + item.stock, 0)}</h2><span>Across {state.products.length} products</span></article></section><section className="panel analytics-breakdown"><div className="panel-heading"><div><p className="eyebrow">Inventory mix</p><h2>Value distribution</h2></div></div><div className="donut-layout"><div className="donut-chart" style={{ background: `conic-gradient(${categories.map((item, index) => { const colors = ["#2b7a78", "#e69a59", "#6767a8", "#83a36d"]; const before = categories.slice(0, index).reduce((sum, entry) => sum + entry.value, 0) / totalValue * 100; const after = before + item.value / totalValue * 100; return `${colors[index % colors.length]} ${before}% ${after}%`; }).join(",")})` }}><span><strong>{formatCurrency(totalValue, preferences.currency)}</strong><small>Total value</small></span></div><div className="donut-legend">{categories.map((item, index) => <div key={item.name}><i className={`legend-${index}`} /><span>{item.name}</span><strong>{Math.round(item.value / totalValue * 100)}%</strong></div>)}</div></div></section></div>;
}
