import { useMemo } from "react";
import { Download, FileBarChart, PackageSearch, ReceiptText } from "lucide-react";
import { PageHeader } from "../../components/ui/PageHeader";
import { useAppData } from "../../contexts/AppDataContext";
import { useNotifications } from "../../contexts/NotificationContext";
import { usePreferences } from "../../contexts/PreferencesContext";
import { calculateAnalytics, categoryInventory } from "../../utils/analytics";
import { formatCurrency } from "../../utils/formatters";

export default function ReportsPage() {
  const { state } = useAppData();
  const { preferences } = usePreferences();
  const { showNotification } = useNotifications();
  const analytics = useMemo(() => calculateAnalytics(state, preferences.lowStockThreshold), [preferences.lowStockThreshold, state]);
  const categories = useMemo(() => categoryInventory(state.products), [state.products]);
  const exportReport = () => {
    const csv = ["Category,Units,Inventory Value", ...categories.map((item) => `${item.name},${item.units},${item.value}`)].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "stockflow-inventory-report.csv"; anchor.click(); URL.revokeObjectURL(url);
    showNotification({ type: "success", message: "Inventory report exported." });
  };
  return <div className="page-stack"><PageHeader eyebrow="Lazy-loaded module" title="Reports" description="Operational summaries for sales and inventory planning." action={<button className="button button-primary" type="button" onClick={exportReport}><Download size={17} /> Export CSV</button>} /><section className="report-card-grid"><article><span><ReceiptText size={22} /></span><div><p>Revenue report</p><strong>{formatCurrency(analytics.totalRevenue, preferences.currency)}</strong><small>{state.orders.length} orders analyzed</small></div></article><article><span><PackageSearch size={22} /></span><div><p>Inventory risk</p><strong>{analytics.lowStockProducts.length} items</strong><small>At or below {preferences.lowStockThreshold} units</small></div></article><article><span><FileBarChart size={22} /></span><div><p>Top customer</p><strong>{analytics.topCustomer?.name || "—"}</strong><small>{formatCurrency(analytics.topCustomerSpend, preferences.currency)} spend</small></div></article></section><section className="panel"><div className="panel-heading"><div><p className="eyebrow">Stock valuation</p><h2>Inventory by category</h2></div></div><div className="category-report">{categories.map((category) => <div key={category.name}><div><strong>{category.name}</strong><span>{category.units} units</span></div><div className="progress-track"><span style={{ width: `${Math.max(7, category.value / Math.max(...categories.map((item) => item.value)) * 100)}%` }} /></div><strong>{formatCurrency(category.value, preferences.currency)}</strong></div>)}</div></section></div>;
}
