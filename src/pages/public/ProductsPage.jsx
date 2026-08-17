import { useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, LoaderCircle, Search, ShoppingBag, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppData } from "../../contexts/AppDataContext";
import { useNotifications } from "../../contexts/NotificationContext";
import { fetchProductPage, searchCatalog } from "../../services/mockApi";
import { formatCurrency } from "../../utils/formatters";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);
  const loadingRef = useRef(false);
  const sentinelRef = useRef(null);
  const { dispatch } = useAppData();
  const { showNotification } = useNotifications();

  const loadNext = useCallback(async () => {
    if (loadingRef.current || !hasMore || search.trim()) return;
    loadingRef.current = true;
    setLoading(true);
    setError("");
    try {
      const result = await fetchProductPage(pageRef.current);
      setProducts((current) => [...current, ...result.items.filter((item) => !current.some((loaded) => loaded.id === item.id))]);
      setHasMore(result.hasMore);
      pageRef.current += 1;
    } catch (loadError) {
      setError(loadError.message || "Could not load the next page.");
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [hasMore, search]);

  useEffect(() => { loadNext(); }, [loadNext]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || search.trim()) return undefined;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) loadNext(); }, { rootMargin: "240px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [loadNext, search]);

  useEffect(() => {
    const query = search.trim();
    if (!query) {
      setSearchResults([]);
      setSearchLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    setSearchLoading(true);
    setError("");

    searchCatalog(query, controller.signal)
      .then(setSearchResults)
      .catch((searchError) => {
        if (searchError.name !== "AbortError") setError(searchError.message || "Search failed.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setSearchLoading(false);
      });

    return () => controller.abort();
  }, [search]);

  function addToCart(product) {
    dispatch({ type: "ADD_TO_CART", product });
    showNotification({ type: "success", message: `${product.name} added to cart.` });
  }

  const visibleProducts = search.trim() ? searchResults : products;

  return (
    <section className="catalog-page">
      <div className="catalog-header">
        <p className="eyebrow">Curated for focused work</p>
        <h1>Product catalog</h1>
        <p>Search by product name, SKU, category or browse the asynchronously loaded catalog.</p>
        <label className="search-field catalog-search">
          <Search size={18} />
          <span className="sr-only">Search products</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products…" aria-label="Search products" />
          {search && <button type="button" className="search-clear" onClick={() => setSearch("")} aria-label="Clear product search"><X size={16} /></button>}
        </label>
      </div>

      {searchLoading && <div className="infinite-status"><LoaderCircle className="spin" size={21} /><span>Searching products…</span></div>}

      {!searchLoading && search.trim() && visibleProducts.length === 0 && (
        <div className="simple-state"><Search size={42} /><h2>No products found</h2><p>Try another product name, SKU or category.</p></div>
      )}

      {visibleProducts.length > 0 && <div className="catalog-grid">{visibleProducts.map((product, index) => <article className="catalog-card" key={product.id}><Link to={`/products/${product.id}`} className={`catalog-art product-tone-${index % 4}`}><span>{product.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span><small>{product.category}</small></Link><div className="catalog-info"><p>{product.brand}</p><Link to={`/products/${product.id}`}><h2>{product.name}</h2></Link><div><strong>{formatCurrency(product.price)}</strong><span className={product.stock <= 5 ? "text-danger" : ""}>{product.stock} available</span></div><button className="button button-dark" type="button" onClick={() => addToCart(product)} disabled={product.stock === 0}><ShoppingBag size={16} /> Add to cart</button></div></article>)}</div>}

      {!search.trim() && <div className="infinite-status" ref={sentinelRef}>
        {loading && <><LoaderCircle className="spin" size={21} /><span>Loading the next page…</span></>}
        {error && <><AlertCircle size={21} /><span>{error}</span><button className="text-link" type="button" onClick={loadNext}>Try again</button></>}
        {!hasMore && products.length > 0 && <span>You’ve reached the end — {products.length} products loaded.</span>}
      </div>}
    </section>
  );
}
