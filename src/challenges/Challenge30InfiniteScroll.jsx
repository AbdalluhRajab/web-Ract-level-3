import { useEffect, useRef, useState } from "react";

const allProducts = Array.from({ length: 45 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
}));

function Challenge30InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const loadingRef = useRef(false);

  const pageSize = 10;
  const hasMore = items.length < allProducts.length;

  useEffect(() => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setLoading(true);
    setFailed(false);

    const timer = setTimeout(() => {
      const start = (page - 1) * pageSize;
      const next = allProducts.slice(start, start + pageSize);
      setItems((current) => [...current, ...next]);
      setLoading(false);
      loadingRef.current = false;
    }, 300);

    return () => clearTimeout(timer);
  }, [page, hasMore]);

  useEffect(() => {
    function onScroll() {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

      if (nearBottom && !loadingRef.current && hasMore) {
        setPage((current) => current + 1);
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasMore]);

  return (
    <div>
      <h2>Challenge 30 — Infinite Scroll</h2>
      {items.map((item) => <p key={item.id}>{item.name}</p>)}
      {loading && <p>Loading...</p>}
      {!hasMore && <p>End of list.</p>}
      {failed && <p>Could not load the next page.</p>}
    </div>
  );
}

export default Challenge30InfiniteScroll;