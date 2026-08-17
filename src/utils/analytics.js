export function calculateAnalytics({ orders, products, customers }, lowStockThreshold = 8) {
  const successfulOrders = orders.filter((order) => order.status !== "Refunded");
  const totalRevenue = successfulOrders.reduce((sum, order) => sum + order.total, 0);
  const today = new Date().toDateString();
  const ordersToday = orders.filter((order) => new Date(order.date).toDateString() === today).length;
  const averageOrderValue = successfulOrders.length ? totalRevenue / successfulOrders.length : 0;

  const productUnits = new Map();
  const customerSpend = new Map();
  successfulOrders.forEach((order) => {
    customerSpend.set(order.customerId, (customerSpend.get(order.customerId) || 0) + order.total);
    order.items.forEach((item) => productUnits.set(item.productId, (productUnits.get(item.productId) || 0) + item.quantity));
  });

  const bestProductEntry = [...productUnits.entries()].sort((a, b) => b[1] - a[1])[0];
  const topCustomerEntry = [...customerSpend.entries()].sort((a, b) => b[1] - a[1])[0];

  return {
    totalRevenue,
    ordersToday,
    averageOrderValue,
    bestSellingProduct: products.find((product) => product.id === bestProductEntry?.[0]) || null,
    bestSellingUnits: bestProductEntry?.[1] || 0,
    topCustomer: customers.find((customer) => customer.id === topCustomerEntry?.[0]) || null,
    topCustomerSpend: topCustomerEntry?.[1] || 0,
    lowStockProducts: products.filter((product) => product.stock <= lowStockThreshold),
  };
}

export function buildDailySales(orders, days = 7) {
  return Array.from({ length: days }, (_, offset) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - offset));
    const key = date.toDateString();
    return {
      label: date.toLocaleDateString("en", { weekday: "short" }),
      value: orders
        .filter((order) => order.status !== "Refunded" && new Date(order.date).toDateString() === key)
        .reduce((sum, order) => sum + order.total, 0),
    };
  });
}

export function categoryInventory(products) {
  return Object.values(products.reduce((groups, product) => {
    groups[product.category] ??= { name: product.category, units: 0, value: 0 };
    groups[product.category].units += product.stock;
    groups[product.category].value += product.stock * product.price;
    return groups;
  }, {})).sort((a, b) => b.value - a.value);
}
