import { useEffect, useState } from "react";

function fakeSearch(query, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (signal.aborted) return;
      resolve([`${query} result 1`, `${query} result 2`]);
    }, 500);

    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      const error = new DOMException("Aborted", "AbortError");
      reject(error);
    });
  });
}

function Challenge32CancelableSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    fakeSearch(query, controller.signal)
      .then(setResults)
      .catch((error) => {
        if (error.name !== "AbortError") console.error(error);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [query]);

  return (
    <div>
      <h2>Challenge 32 — Cancel Outdated API Requests</h2>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
      {loading && <p>Loading...</p>}
      <ul>{results.map((result) => <li key={result}>{result}</li>)}</ul>
    </div>
  );
}

export default Challenge32CancelableSearch;