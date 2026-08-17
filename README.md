# StockFlow - Advanced React Inventory & Sales Dashboard

StockFlow is a production-style React capstone that solves the Level 3 assignment as one cohesive application. It includes the public shop, protected administration workspace, role-based permissions, reusable CRUD modules, analytics, notifications, async correctness demonstrations, and written solutions.

## Run the project

Requirements: Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:4173`.

Verification commands:

```bash
npm test
npm run build
npm run check
```

## Demo accounts

| Role | Email | Password | Access |
|---|---|---|---|
| Admin | `admin@stockflow.dev` | `admin123` | Full access and Challenge Lab |
| Manager | `manager@stockflow.dev` | `manager123` | Overview, products, orders, reports, analytics |
| Employee | `employee@stockflow.dev` | `employee123` | Orders only |
| Customer | `customer@stockflow.dev` | `customer123` | Protected customer area |

The login page also provides one-click buttons for all four roles.

## Assignment coverage

| Challenge | Implementation |
|---|---|
| 23 - Routing | Public and dashboard layouts; nested, dynamic, protected, and 404 routes in `src/App.jsx` |
| 24 - Protected routes | `ProtectedRoute` preserves the requested location and redirects guests to login |
| 25 - RBAC | Central permission map, route guards, role-aware navigation, and reusable `Can` action guard |
| 26 - Global state | Auth, notifications, preferences contexts; application reducer for entities and cart |
| 27 - Performance | 10,000-record filter measured and isolated with `useMemo` and `React.memo` in Challenge Lab |
| 28 - Lazy loading | Dashboard Overview, Reports, Analytics, Settings, and Challenge Lab use `React.lazy` + `Suspense` |
| 29 - Modal | One accessible modal handles create, edit, read, delete-product, delete-user, and logout flows |
| 30 - Infinite scroll | Public catalog uses paged service calls, IntersectionObserver, duplicate-request guard, error retention, and end state |
| 31 - localStorage hook | `useLocalStorage` safely parses, falls back, and persists theme/settings/session |
| 32 - API cancellation | Search effect owns an `AbortController`; cleanup cancels stale requests without false errors |
| 33 - Data table | Dynamic columns, sort, search, filters, pagination, actions, loading and empty states; reused for resources and orders |
| 34 - Notifications | Success/error/warning/info, stacking, auto/manual dismissal, `aria-live`, and `showNotification()` API |
| 35 - Error architecture | Typed API errors plus consistent network/401/403/404/422/500 user messages |
| 36 - Optimistic UI | Immediate todo toggle, server call, version-safe rollback, and error notification |
| 37 - Analytics | Revenue, today’s orders, average value, best seller, top customer, and low stock derived from raw records |
| 38 - Refactor | Feature-oriented pages, components, hooks, contexts, services, configs, and pure utilities |
| 39 - Error boundary | Class boundary with fallback and recovery; intentional render-error demo |
| 40 - CRUD architecture | One `ResourcePage` drives Products, Customers, Categories, Brands, and Employees with resource-specific configuration |

## Capstone features

- Login, logout, protected routes, and action-level permissions
- Dashboard KPIs, seven-day sales chart, orders, and low-stock alerts
- Product list/details/add/edit/delete
- Categories, brands, customers, users, and orders
- Search, filtering, sorting, pagination, validation, notifications, theme, and settings
- Responsive public and administration layouts
- Persistent browser data with a safe reset control
- CSV inventory report export
- Accessible labels, focus handling, live notifications, and reduced-motion support

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Conceptual answers](docs/CONCEPTUAL_ANSWERS.md)
- [Debugging solutions](docs/DEBUGGING_SOLUTIONS.md)
- [Three major technical decisions](docs/TECHNICAL_DECISIONS.md)
- [Demo presentation script](docs/DEMO_SCRIPT.md)
- [Known limitations](docs/KNOWN_LIMITATIONS.md)
- [Screenshots](docs/screenshots/README.md)

## Project structure

```text
src/
  components/        shared authorization, routing, and UI primitives
  config/            resource-specific CRUD schemas
  contexts/          authentication, application data, notifications, preferences
  data/              deterministic seed data
  hooks/             reusable browser persistence hook
  layouts/           public and dashboard route shells
  pages/             public pages and lazy-loaded dashboard features
  services/          simulated asynchronous API boundary
  utils/             analytics, errors, formatting, permissions, validation
```

All API behavior is intentionally simulated so the repository runs without a backend. Data is stored in browser `localStorage`; use **Settings -> Reset demo data** to restore the original records.
