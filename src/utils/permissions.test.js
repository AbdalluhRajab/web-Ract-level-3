import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { hasPermission, landingPathForRole } from "./permissions.js";

describe("role permissions", () => {
  it("grants Admin every permission", () => {
    assert.equal(hasPermission({ role: "Admin" }, "products:delete"), true);
    assert.equal(hasPermission({ role: "Admin" }, "anything:new"), true);
  });

  it("limits Employee to order work", () => {
    assert.equal(hasPermission({ role: "Employee" }, "orders:view"), true);
    assert.equal(hasPermission({ role: "Employee" }, "products:view"), false);
  });

  it("selects a safe landing page per role", () => {
    assert.equal(landingPathForRole("Customer"), "/customer");
    assert.equal(landingPathForRole("Employee"), "/dashboard/orders");
    assert.equal(landingPathForRole("Manager"), "/dashboard");
  });
});
