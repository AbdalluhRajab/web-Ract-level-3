import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { initialData } from "../data/seed.js";
import { calculateAnalytics, categoryInventory } from "./analytics.js";

describe("calculateAnalytics", () => {
  it("derives dashboard metrics without duplicating state", () => {
    const result = calculateAnalytics(initialData, 5);
    assert.equal(result.totalRevenue, 2068);
    assert.equal(result.ordersToday, 3);
    assert.ok(Math.abs(result.averageOrderValue - 2068 / 7) < 0.001);
    assert.equal(result.bestSellingProduct.name, "Wireless Keyboard");
    assert.equal(result.bestSellingUnits, 4);
    assert.equal(result.topCustomer.name, "Maya Khalil");
    assert.deepEqual(result.lowStockProducts.map((item) => item.id), ["p-104", "p-107", "p-110", "p-112"]);
  });

  it("groups current inventory by category", () => {
    const result = categoryInventory(initialData.products);
    assert.equal(result.length, 4);
    assert.equal(result.reduce((sum, group) => sum + group.units, 0), initialData.products.reduce((sum, product) => sum + product.stock, 0));
  });
});
