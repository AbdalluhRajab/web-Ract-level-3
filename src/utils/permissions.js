export const rolePermissions = {
  Admin: ["*"],
  Manager: [
    "dashboard:view",
    "products:view", "products:create", "products:update",
    "orders:view", "orders:update",
    "reports:view", "analytics:view",
  ],
  Employee: ["orders:view", "orders:update"],
  Customer: ["customer:view"],
};

export function hasPermission(user, permission) {
  if (!user) return false;
  const permissions = rolePermissions[user.role] || [];
  return permissions.includes("*") || permissions.includes(permission);
}

export function landingPathForRole(role) {
  if (role === "Customer") return "/customer";
  if (role === "Employee") return "/dashboard/orders";
  return "/dashboard";
}
