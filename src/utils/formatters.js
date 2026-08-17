export function formatCurrency(value, currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(value || 0);
}

export function formatDate(value, options = { month: "short", day: "numeric", year: "numeric" }) {
  return new Intl.DateTimeFormat("en", options).format(new Date(value));
}

export function titleCase(value = "") {
  return value.replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
}
