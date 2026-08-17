# Level 3 — Part A: Conceptual Answers

> Review and rewrite these answers in your own words before submission.

## Q1. What causes a React component to re-render?
A component can re-render when its state changes, when its parent renders and passes new props, or when a consumed context value changes. A re-render means React runs the component again to calculate the next UI.

## Q2. What is the difference between useMemo, useCallback and React.memo?
`useMemo` memoizes a calculated value. `useCallback` memoizes a function reference. `React.memo` can skip rendering a component when its props have not changed. They should be used when there is a demonstrated performance reason, not automatically everywhere.

## Q3. When can memoization make an application more complex or slower?
Memoization has its own comparison and memory costs. If a calculation is cheap, the optimization can cost more than it saves. It can also make code harder to understand and can become ineffective when dependencies or props change frequently.

## Q4. Explain local component state, global client state and server state.
Local state belongs to one component or a small component area. Global client state is shared application state such as theme, authentication or cart data. Server state comes from an external backend and has concerns such as loading, caching, synchronization and errors.

## Q5. What is a custom hook, and what rules should custom hooks follow?
A custom hook is a reusable function whose name normally starts with `use` and which can use other React hooks. Hooks must be called only at the top level of React components or other custom hooks, not inside loops, conditions or nested functions.

## Q6. What is the difference between useRef and useState?
`useState` stores data that affects rendering and causes a re-render when updated. `useRef` stores a mutable value that persists between renders without causing a re-render when changed. Refs are also commonly used to access DOM elements.

## Q7. Why must Hooks not be called conditionally?
React relies on hooks being called in the same order on every render. Conditional hook calls can change that order and cause React to associate state or effects with the wrong hook.

## Q8. What is a stale closure?
A stale closure happens when a function created during an earlier render keeps references to old state or props. This can happen in timers, effects or callbacks when dependencies are missing. Correct dependencies or functional state updates can prevent it.

## Q9. What is code splitting?
Code splitting breaks an application into smaller JavaScript chunks that can be loaded when needed. With lazy routes, users do not need to download every large page before using the application, which can improve initial loading performance.

## Q10. What is an Error Boundary?
An Error Boundary is a React class component pattern that catches rendering errors in descendant components and displays fallback UI instead of allowing the whole UI tree to fail. It does not catch every kind of error, such as ordinary event-handler errors or arbitrary asynchronous errors.

## Q11. How would you structure a large React application?
I would organize code by clear responsibilities and features: pages/routes, reusable UI components, feature modules, contexts/state, hooks, services for API calls, utilities and configuration. Shared code should be reusable while feature-specific code should stay close to its feature.

## Q12. How would you investigate unnecessary re-renders?
I would reproduce the issue and use React DevTools Profiler to see which components render and why. Then I would inspect state placement, changing object/function references, context updates and component boundaries. I would optimize only after identifying the expensive or unnecessary work.
