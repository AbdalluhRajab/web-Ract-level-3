import { useState } from "react";

const initial = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Mouse" },
];

function ResourceCrud({ resourceName, initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState("");

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  function add() {
    const name = window.prompt(`New ${resourceName} name`);
    if (!name?.trim()) return;
    setItems((current) => [...current, { id: Date.now(), name: name.trim() }]);
  }

  function remove(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <section>
      <h3>{resourceName}</h3>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search ${resourceName}`} />
      <button onClick={add}>Create</button>
      <ul>
        {filtered.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => remove(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Challenge40CrudArchitecture() {
  const resources = ["Products", "Customers", "Categories", "Brands", "Employees"];

  return (
    <div>
      <h2>Challenge 40 — Reusable CRUD Architecture</h2>
      {resources.map((name) => (
        <ResourceCrud key={name} resourceName={name} initialItems={initial} />
      ))}
    </div>
  );
}

export default Challenge40CrudArchitecture;