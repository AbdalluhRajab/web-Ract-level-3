import { formatCurrency } from "../utils/formatters";

const statusOptions = ["Active", "Inactive"];

export const resourceConfigs = {
  products: {
    singular: "Product",
    title: "Products",
    description: "Control pricing, stock, categories, and catalog availability.",
    permission: "products",
    fields: [
      { key: "name", label: "Product name", rules: ["required"] },
      { key: "sku", label: "SKU", rules: ["required"] },
      { key: "category", label: "Category", type: "select", options: ["Electronics", "Office", "Furniture", "Accessories"], rules: ["required"] },
      { key: "brand", label: "Brand", rules: ["required"] },
      { key: "price", label: "Price", type: "number", rules: ["positive"] },
      { key: "stock", label: "Stock", type: "number", rules: ["nonNegative"] },
      { key: "status", label: "Status", type: "select", options: statusOptions, rules: ["required"] },
    ],
    columns: [
      { key: "name", label: "Product" },
      { key: "sku", label: "SKU" },
      { key: "category", label: "Category" },
      { key: "price", label: "Price", render: (value) => formatCurrency(value) },
      { key: "stock", label: "Stock", render: (value) => <span className={value <= 5 ? "text-danger" : ""}>{value}</span> },
      { key: "status", label: "Status", type: "status" },
    ],
    filters: [{ key: "category", label: "All categories", options: ["Electronics", "Office", "Furniture", "Accessories"] }],
  },
  categories: {
    singular: "Category",
    title: "Categories",
    description: "Organize the product catalog into clear, reusable groups.",
    permission: "categories",
    fields: [
      { key: "name", label: "Category name", rules: ["required"] },
      { key: "description", label: "Description", type: "textarea", rules: ["required"] },
      { key: "status", label: "Status", type: "select", options: statusOptions, rules: ["required"] },
    ],
    columns: [{ key: "name", label: "Category" }, { key: "description", label: "Description" }, { key: "status", label: "Status", type: "status" }],
  },
  brands: {
    singular: "Brand",
    title: "Brands",
    description: "Maintain supplier brands used by products.",
    permission: "brands",
    fields: [
      { key: "name", label: "Brand name", rules: ["required"] },
      { key: "country", label: "Country", rules: ["required"] },
      { key: "status", label: "Status", type: "select", options: statusOptions, rules: ["required"] },
    ],
    columns: [{ key: "name", label: "Brand" }, { key: "country", label: "Country" }, { key: "status", label: "Status", type: "status" }],
  },
  customers: {
    singular: "Customer",
    title: "Customers",
    description: "Keep customer contacts and service tiers current.",
    permission: "customers",
    fields: [
      { key: "name", label: "Full name", rules: ["required"] },
      { key: "email", label: "Email", type: "email", rules: ["required", "email"] },
      { key: "company", label: "Company", rules: ["required"] },
      { key: "tier", label: "Tier", type: "select", options: ["Bronze", "Silver", "Gold"], rules: ["required"] },
    ],
    columns: [{ key: "name", label: "Customer" }, { key: "email", label: "Email" }, { key: "company", label: "Company" }, { key: "tier", label: "Tier", type: "status" }],
    filters: [{ key: "tier", label: "All tiers", options: ["Bronze", "Silver", "Gold"] }],
  },
  employees: {
    singular: "User",
    title: "Users",
    description: "Manage employee access, roles, and account status.",
    permission: "users",
    fields: [
      { key: "name", label: "Full name", rules: ["required"] },
      { key: "email", label: "Email", type: "email", rules: ["required", "email"] },
      { key: "role", label: "Role", type: "select", options: ["Admin", "Manager", "Employee", "Customer"], rules: ["required"] },
      { key: "status", label: "Status", type: "select", options: ["Active", "Invited", "Suspended"], rules: ["required"] },
    ],
    columns: [{ key: "name", label: "User" }, { key: "email", label: "Email" }, { key: "role", label: "Role" }, { key: "status", label: "Status", type: "status" }],
    filters: [{ key: "role", label: "All roles", options: ["Admin", "Manager", "Employee", "Customer"] }],
  },
};
