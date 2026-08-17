import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { initialData } from "../data/seed.js";
import { dataReducer } from "./dataReducer.js";

describe("dataReducer", () => {
  it("creates, updates, and deletes generic resources immutably", () => {
    const record = { id: "p-new", name: "New Product" };
    const created = dataReducer(initialData, { type: "CREATE_RESOURCE", resource: "products", record });
    assert.notEqual(created, initialData);
    assert.deepEqual(created.products[0], record);
    const updated = dataReducer(created, { type: "UPDATE_RESOURCE", resource: "products", record: { ...record, name: "Updated Product" } });
    assert.equal(updated.products[0].name, "Updated Product");
    const deleted = dataReducer(updated, { type: "DELETE_RESOURCE", resource: "products", id: record.id });
    assert.equal(deleted.products.some((item) => item.id === record.id), false);
  });

  it("coalesces repeated cart additions", () => {
    const product = initialData.products[0];
    const once = dataReducer(initialData, { type: "ADD_TO_CART", product });
    const twice = dataReducer(once, { type: "ADD_TO_CART", product });
    assert.equal(twice.cart.length, 1);
    assert.equal(twice.cart[0].quantity, 2);
  });
});
