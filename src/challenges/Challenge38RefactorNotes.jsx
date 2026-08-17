function Challenge38RefactorNotes() {
  const structure = [
    "components/ — reusable UI",
    "hooks/ — reusable stateful logic",
    "services/ — API/data access",
    "contexts/ — cross-cutting state",
    "utils/ — pure helpers",
    "pages/ — route-level screens",
  ];

  return (
    <div>
      <h2>Challenge 38 — Refactor the Bad Component</h2>
      <p>The refactored architecture separates UI, stateful logic, services, contexts, utilities and pages.</p>
      <ul>{structure.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}

export default Challenge38RefactorNotes;