# Level 3 — Architecture Notes

## Main layers

- `pages/` — route-level screens.
- `components/` — reusable UI and permission components.
- `layouts/` — shared public/dashboard layouts.
- `contexts/` — application-wide state and services.
- `hooks/` — reusable stateful logic.
- `services/` — API/data access.
- `reducers/` — reducer-based state transitions.
- `utils/` — pure helpers such as validation, permissions and analytics.
- `data/` — seed/demo data.
- `config/` — reusable resource configuration.
- `docs/` — submission documentation.

## Data flow

Pages consume application state through contexts and reusable hooks/components. Mutations are routed through centralized state or service functions instead of duplicating business logic in every page.

## Routing

Public pages use the public layout. Dashboard pages use the protected dashboard layout. Dynamic routes are used for resource details, and unauthorized users receive appropriate redirects or an unauthorized page.

## Reusability

The DataTable, Modal, notifications, permission checking and resource configuration are intended to be shared across multiple screens.
