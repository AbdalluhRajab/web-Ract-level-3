import { useMemo } from "react";
import { Check, RotateCcw } from "lucide-react";
import { DataTable } from "../../components/ui/DataTable";
import { PageHeader } from "../../components/ui/PageHeader";
import { useAppData } from "../../contexts/AppDataContext";
import { useNotifications } from "../../contexts/NotificationContext";
import { usePreferences } from "../../contexts/PreferencesContext";
import { formatCurrency, formatDate } from "../../utils/formatters";

export default function OrdersPage() {
  const { state, dispatch } = useAppData();
  const { showNotification } = useNotifications();
  const { preferences } = usePreferences();
  const columns = useMemo(() => [
    { key: "id", label: "Order" },
    { key: "customer", label: "Customer" },
    { key: "date", label: "Date", render: (value) => formatDate(value), sortValue: (row) => new Date(row.date).getTime() },
    { key: "status", label: "Status", type: "status" },
    { key: "total", label: "Total", render: (value) => formatCurrency(value, preferences.currency) },
  ], [preferences.currency]);

  function updateStatus(order, status) {
    dispatch({ type: "UPDATE_RESOURCE", resource: "orders", record: { ...order, status } });
    showNotification({ type: "success", message: `${order.id} marked ${status.toLowerCase()}.` });
  }

  return (
    <div className="page-stack">
      <PageHeader eyebrow="Sales operations" title="Orders" description="Review fulfillment, payment status, and customer totals." />
      <DataTable rows={state.orders} columns={columns} filters={[{ key: "status", label: "All statuses", options: ["Paid", "Processing", "Shipped", "Refunded"] }]} searchPlaceholder="Search orders or customers…" actions={(order) => <>{order.status === "Processing" && <button className="table-action" type="button" onClick={() => updateStatus(order, "Shipped")} aria-label={`Mark ${order.id} shipped`}><Check size={16} /></button>}{order.status !== "Refunded" && <button className="table-action" type="button" onClick={() => updateStatus(order, "Refunded")} aria-label={`Refund ${order.id}`}><RotateCcw size={16} /></button>}</>} />
    </div>
  );
}
