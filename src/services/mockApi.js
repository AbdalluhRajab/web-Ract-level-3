import { ApiError } from "../utils/errors";
import { catalogProducts } from "../data/seed";

const wait = (duration, signal) => new Promise((resolve, reject) => {
  const timer = setTimeout(resolve, duration);
  signal?.addEventListener("abort", () => {
    clearTimeout(timer);
    reject(new DOMException("The operation was aborted", "AbortError"));
  }, { once: true });
});

export async function fetchProductPage(page, pageSize = 8, signal) {
  await wait(350, signal);
  const start = (page - 1) * pageSize;
  return {
    items: catalogProducts.slice(start, start + pageSize),
    hasMore: start + pageSize < catalogProducts.length,
  };
}

export async function searchCatalog(query, signal) {
  const delay = Math.max(180, 900 - query.length * 90);
  await wait(delay, signal);
  const normalized = query.toLowerCase();
  return catalogProducts.filter((product) => `${product.name} ${product.sku} ${product.category}`.toLowerCase().includes(normalized)).slice(0, 6);
}

export async function updateTodoOnServer(todo, shouldFail = false) {
  await wait(650);
  if (shouldFail) throw new ApiError("The optimistic update was rejected.", 500);
  return todo;
}

export async function simulateApiError(status) {
  await wait(300);
  if (status === 0) throw new TypeError("Network request failed");
  throw new ApiError(`Simulated HTTP ${status}`, status, status === 422 ? { name: "Name is required" } : null);
}
