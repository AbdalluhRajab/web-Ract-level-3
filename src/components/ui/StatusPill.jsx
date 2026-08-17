export function StatusPill({ value }) {
  const tone = {
    Active: "success", Paid: "success", Gold: "warning",
    Processing: "info", Invited: "info", Silver: "neutral",
    Shipped: "purple", Bronze: "neutral",
    Inactive: "neutral", Suspended: "danger", Refunded: "danger",
  }[value] || "neutral";
  return <span className={`status-pill status-${tone}`}>{value}</span>;
}
