# Three Major Technical Decisions

## 1. Context for cross-cutting application state
Authentication, notifications and preferences are shared by many pages, so Context avoids passing the same data through many unrelated component levels.

## 2. Reducer for structured data updates
Inventory/sales data contains several related collections and update operations. A reducer makes those transitions explicit and easier to test than scattering many unrelated state setters.

## 3. Reusable UI systems
DataTable, Modal, notifications and permission checks are centralized because multiple administrative resources need the same behavior. Resource-specific configuration supplies the differences without copying the whole implementation.
