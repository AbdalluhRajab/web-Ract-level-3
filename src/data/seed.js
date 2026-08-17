const todayAt = (hours, minutes = 0) => {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
};

const daysAgo = (days, hours = 12) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(hours, 0, 0, 0);
  return date.toISOString();
};

export const seedProducts = [
  { id: "p-101", sku: "EL-101", name: "Wireless Keyboard", category: "Electronics", brand: "Nexa", price: 79, stock: 18, status: "Active" },
  { id: "p-102", sku: "EL-102", name: "Ergonomic Mouse", category: "Electronics", brand: "Nexa", price: 49, stock: 7, status: "Active" },
  { id: "p-103", sku: "OF-201", name: "Desk Organizer", category: "Office", brand: "Paperline", price: 32, stock: 24, status: "Active" },
  { id: "p-104", sku: "FU-301", name: "Task Chair", category: "Furniture", brand: "Forma", price: 249, stock: 5, status: "Active" },
  { id: "p-105", sku: "EL-103", name: "USB-C Dock", category: "Electronics", brand: "Nexa", price: 139, stock: 11, status: "Active" },
  { id: "p-106", sku: "OF-202", name: "A5 Notebook Set", category: "Office", brand: "Paperline", price: 18, stock: 42, status: "Active" },
  { id: "p-107", sku: "FU-302", name: "Monitor Riser", category: "Furniture", brand: "Forma", price: 65, stock: 4, status: "Active" },
  { id: "p-108", sku: "EL-104", name: "Noise-Cancel Headset", category: "Electronics", brand: "Sonora", price: 189, stock: 16, status: "Active" },
  { id: "p-109", sku: "AC-401", name: "Canvas Backpack", category: "Accessories", brand: "Northstar", price: 89, stock: 13, status: "Active" },
  { id: "p-110", sku: "AC-402", name: "Laptop Sleeve", category: "Accessories", brand: "Northstar", price: 39, stock: 3, status: "Active" },
  { id: "p-111", sku: "EL-105", name: "Webcam Light", category: "Electronics", brand: "Sonora", price: 59, stock: 20, status: "Active" },
  { id: "p-112", sku: "OF-203", name: "Weekly Planner", category: "Office", brand: "Paperline", price: 22, stock: 0, status: "Inactive" },
];

export const seedCategories = [
  { id: "cat-1", name: "Electronics", description: "Devices and computer accessories", status: "Active" },
  { id: "cat-2", name: "Office", description: "Paper, planning, and desk supplies", status: "Active" },
  { id: "cat-3", name: "Furniture", description: "Ergonomic workplace furniture", status: "Active" },
  { id: "cat-4", name: "Accessories", description: "Bags, sleeves, and carry goods", status: "Active" },
];

export const seedBrands = [
  { id: "brand-1", name: "Nexa", country: "Germany", status: "Active" },
  { id: "brand-2", name: "Paperline", country: "United Kingdom", status: "Active" },
  { id: "brand-3", name: "Forma", country: "Denmark", status: "Active" },
  { id: "brand-4", name: "Sonora", country: "Japan", status: "Active" },
  { id: "brand-5", name: "Northstar", country: "Canada", status: "Active" },
];

export const seedCustomers = [
  { id: "cus-1", name: "Maya Khalil", email: "maya@example.com", company: "Lumen Studio", tier: "Gold" },
  { id: "cus-2", name: "Omar Saleh", email: "omar@example.com", company: "Axis Labs", tier: "Silver" },
  { id: "cus-3", name: "Lina Darwish", email: "lina@example.com", company: "Olive & Co.", tier: "Gold" },
  { id: "cus-4", name: "Adam Nasser", email: "adam@example.com", company: "North Office", tier: "Bronze" },
  { id: "cus-5", name: "Sara Hamdan", email: "sara@example.com", company: "Mono Works", tier: "Silver" },
  { id: "cus-6", name: "Yousef Ali", email: "yousef@example.com", company: "Saffron Market", tier: "Bronze" },
];

export const seedEmployees = [
  { id: "emp-1", name: "Nour Haddad", email: "admin@stockflow.dev", role: "Admin", status: "Active" },
  { id: "emp-2", name: "Sami Qasem", email: "manager@stockflow.dev", role: "Manager", status: "Active" },
  { id: "emp-3", name: "Rana Issa", email: "employee@stockflow.dev", role: "Employee", status: "Active" },
  { id: "emp-4", name: "Kareem Zaid", email: "kareem@stockflow.dev", role: "Employee", status: "Invited" },
];

export const seedOrders = [
  { id: "ORD-2048", customerId: "cus-1", customer: "Maya Khalil", date: todayAt(9, 15), status: "Paid", total: 438, items: [{ productId: "p-101", name: "Wireless Keyboard", quantity: 2, price: 79 }, { productId: "p-105", name: "USB-C Dock", quantity: 2, price: 139 }] },
  { id: "ORD-2047", customerId: "cus-2", customer: "Omar Saleh", date: todayAt(11, 40), status: "Processing", total: 249, items: [{ productId: "p-104", name: "Task Chair", quantity: 1, price: 249 }] },
  { id: "ORD-2046", customerId: "cus-3", customer: "Lina Darwish", date: todayAt(14, 5), status: "Paid", total: 267, items: [{ productId: "p-108", name: "Noise-Cancel Headset", quantity: 1, price: 189 }, { productId: "p-102", name: "Ergonomic Mouse", quantity: 1, price: 49 }, { productId: "p-106", name: "A5 Notebook Set", quantity: 1, price: 18 }, { productId: "p-111", name: "Webcam Light", quantity: 0, price: 59 }] },
  { id: "ORD-2045", customerId: "cus-1", customer: "Maya Khalil", date: daysAgo(1), status: "Shipped", total: 338, items: [{ productId: "p-104", name: "Task Chair", quantity: 1, price: 249 }, { productId: "p-109", name: "Canvas Backpack", quantity: 1, price: 89 }] },
  { id: "ORD-2044", customerId: "cus-4", customer: "Adam Nasser", date: daysAgo(2), status: "Paid", total: 204, items: [{ productId: "p-105", name: "USB-C Dock", quantity: 1, price: 139 }, { productId: "p-107", name: "Monitor Riser", quantity: 1, price: 65 }] },
  { id: "ORD-2043", customerId: "cus-5", customer: "Sara Hamdan", date: daysAgo(3), status: "Refunded", total: 128, items: [{ productId: "p-109", name: "Canvas Backpack", quantity: 1, price: 89 }, { productId: "p-110", name: "Laptop Sleeve", quantity: 1, price: 39 }] },
  { id: "ORD-2042", customerId: "cus-3", customer: "Lina Darwish", date: daysAgo(4), status: "Shipped", total: 396, items: [{ productId: "p-101", name: "Wireless Keyboard", quantity: 2, price: 79 }, { productId: "p-108", name: "Noise-Cancel Headset", quantity: 1, price: 189 }, { productId: "p-102", name: "Ergonomic Mouse", quantity: 1, price: 49 }] },
  { id: "ORD-2041", customerId: "cus-6", customer: "Yousef Ali", date: daysAgo(5), status: "Paid", total: 176, items: [{ productId: "p-106", name: "A5 Notebook Set", quantity: 2, price: 18 }, { productId: "p-111", name: "Webcam Light", quantity: 1, price: 59 }, { productId: "p-109", name: "Canvas Backpack", quantity: 1, price: 89 }] },
];

export const initialData = {
  products: seedProducts,
  categories: seedCategories,
  brands: seedBrands,
  customers: seedCustomers,
  employees: seedEmployees,
  orders: seedOrders,
  cart: [],
};

const catalogNames = ["Portable SSD", "Travel Adapter", "Desk Lamp", "Cable Kit", "Felt Desk Mat", "Mechanical Keypad", "Phone Stand", "Document Tray", "Marker Set", "Water Bottle"];
export const catalogProducts = Array.from({ length: 48 }, (_, index) => {
  if (index < seedProducts.length) return seedProducts[index];
  const number = index + 1;
  const category = ["Electronics", "Office", "Furniture", "Accessories"][index % 4];
  return {
    id: `catalog-${number}`,
    sku: `SF-${String(number).padStart(3, "0")}`,
    name: `${catalogNames[index % catalogNames.length]} ${Math.floor(index / catalogNames.length) + 1}`,
    category,
    brand: ["Nexa", "Paperline", "Forma", "Northstar"][index % 4],
    price: 24 + ((index * 17) % 180),
    stock: (index * 7) % 36,
    status: "Active",
  };
});
