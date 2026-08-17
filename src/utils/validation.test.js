import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { validateRecord } from "./validation.js";

const fields = [
  { key: "name", rules: ["required"] },
  { key: "email", rules: ["required", "email"] },
  { key: "price", rules: ["positive"] },
  { key: "stock", rules: ["nonNegative"] },
];

describe("validateRecord", () => {
  it("returns field-specific failures", () => {
    assert.deepEqual(validateRecord(fields, { name: "", email: "bad", price: 0, stock: -1 }), {
      name: "This field is required.",
      email: "Enter a valid email address.",
      price: "Enter a value greater than zero.",
      stock: "Enter zero or a positive value.",
    });
  });

  it("accepts a valid record", () => {
    assert.deepEqual(validateRecord(fields, { name: "Desk Lamp", email: "buyer@example.com", price: 45, stock: 0 }), {});
  });
});
