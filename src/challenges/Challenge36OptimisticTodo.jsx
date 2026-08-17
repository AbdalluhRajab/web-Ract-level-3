import { useState } from "react";

function saveTodoOnServer(todo) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(todo), 500);
  });
}

function Challenge36OptimisticTodo() {
  const [todo, setTodo] = useState({ id: 1, text: "Complete Level 3", completed: false });
  const [error, setError] = useState("");

  async function toggleTodo() {
    const previous = todo;
    const optimistic = { ...todo, completed: !todo.completed };

    setTodo(optimistic);
    setError("");

    try {
      await saveTodoOnServer(optimistic);
    } catch {
      setTodo(previous);
      setError("Update failed. Previous state restored.");
    }
  }

  return (
    <div>
      <h2>Challenge 36 — Optimistic UI</h2>
      <p>{todo.completed ? "Completed" : "Incomplete"} — {todo.text}</p>
      <button onClick={toggleTodo}>Toggle</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Challenge36OptimisticTodo;