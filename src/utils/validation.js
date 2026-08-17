export const validators = {
  required: (value) => (String(value ?? "").trim() ? "" : "This field is required."),
  email: (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Enter a valid email address."),
  positive: (value) => (Number(value) > 0 ? "" : "Enter a value greater than zero."),
  nonNegative: (value) => (Number(value) >= 0 ? "" : "Enter zero or a positive value."),
};

export function validateRecord(fields, values) {
  return fields.reduce((errors, field) => {
    for (const rule of field.rules || []) {
      const message = validators[rule]?.(values[field.key]);
      if (message) {
        errors[field.key] = message;
        break;
      }
    }
    return errors;
  }, {});
}
