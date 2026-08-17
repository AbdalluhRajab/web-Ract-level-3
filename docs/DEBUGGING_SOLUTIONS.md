# Level 3 — Part C: Debugging Solutions

## Debugging 1 — State Does Not Update
Problem: `count` is an ordinary local variable, so changing it does not tell React to render again.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((value) => value + 1)}>
      {count}
    </button>
  );
}
```

Concept: React state and re-rendering.

## Debugging 2 — Conditional Hook
Problem: the hook is called only when `count > 5`, which violates the Rules of Hooks.

```jsx
function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  return (
    <>
      {count > 5 && <p>{message}</p>}
      <button onClick={() => setCount((value) => value + 1)}>
        {count}
      </button>
    </>
  );
}
```

The hook is always called in the same order.

## Debugging 3 — Missing List Key

```jsx
products.map((product) => (
  <Product key={product.id} product={product} />
))
```

A stable key helps React identify list items between renders.

## Debugging 4 — Effect Resource Leak

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log("running");
  }, 1000);

  return () => clearInterval(id);
}, []);
```

The cleanup prevents the interval from continuing after the effect is removed.

## Debugging 5 — Direct State Mutation

```jsx
const addProduct = () => {
  setProducts((current) => [...current, newProduct]);
};
```

The original array should not be mutated with `push`. Creating a new array gives React a new reference and preserves immutable state updates.

## Debugging 6 — Missing Effect Dependency

```jsx
useEffect(() => {
  fetchUser(userId);
}, [userId]);
```

When `userId` changes, the effect should run for the new user. The dependency communicates that relationship to React.
