import { memo, useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, BellRing, CheckCircle2, Clock3, Gauge, Search, Send, ShieldAlert, Sparkles, Zap } from "lucide-react";
import { ErrorBoundary } from "../../components/ui/ErrorBoundary";
import { PageHeader } from "../../components/ui/PageHeader";
import { useNotifications } from "../../contexts/NotificationContext";
import { searchCatalog, simulateApiError, updateTodoOnServer } from "../../services/mockApi";
import { toUserError } from "../../utils/errors";

const largeCatalog = Array.from({ length: 10_000 }, (_, index) => ({
  id: index + 1,
  name: `Performance Product ${String(index + 1).padStart(5, "0")}`,
  category: ["Electronics", "Office", "Furniture", "Accessories"][index % 4],
  score: (index * 7919) % 997,
}));

const ResultList = memo(function ResultList({ products }) {
  return <div className="performance-results">{products.slice(0, 5).map((product) => <span key={product.id}>{product.name}</span>)}</div>;
});

function PerformanceDemo() {
  const [query, setQuery] = useState("");
  const [note, setNote] = useState("");
  const runs = useRef(0);
  const measurement = useRef(0);
  const filtered = useMemo(() => {
    const start = performance.now();
    runs.current += 1;
    const term = query.toLowerCase();
    const result = largeCatalog.filter((product) => product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term)).sort((a, b) => b.score - a.score);
    measurement.current = performance.now() - start;
    return result;
  }, [query]);
  return <article className="lab-card"><div className="lab-card-heading"><span><Gauge size={20} /></span><div><p>Challenge 27</p><h2>10,000-item performance</h2></div></div><p>The expensive filter depends only on its query. Typing in the unrelated note re-renders this component without recomputing the list.</p><label><span>Filter products</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try ‘office’…" /></label><label><span>Unrelated note</span><input value={note} onChange={(event) => setNote(event.target.value)} placeholder="This does not rerun the filter" /></label><div className="lab-metrics"><span><strong>{filtered.length}</strong> matches</span><span><strong>{runs.current}</strong> filter runs</span><span><strong>{measurement.current.toFixed(2)}ms</strong> last run</span></div><ResultList products={filtered} /></article>;
}

function CancellableSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle");
  useEffect(() => {
    if (!query.trim()) { setResults([]); setStatus("idle"); return undefined; }
    const controller = new AbortController();
    setStatus("loading");
    searchCatalog(query, controller.signal).then((items) => { setResults(items); setStatus("success"); }).catch((error) => { if (error.name !== "AbortError") setStatus("error"); });
    return () => controller.abort();
  }, [query]);
  return <article className="lab-card"><div className="lab-card-heading"><span><Search size={20} /></span><div><p>Challenge 32</p><h2>Cancel outdated searches</h2></div></div><p>Each query owns an AbortController. Effect cleanup cancels the previous request so only the latest response can win.</p><label><span>Rapid product search</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Type quickly…" /></label><div className="search-demo-results">{status === "loading" && <span><Clock3 size={15} /> Waiting for latest query…</span>}{status === "error" && <span className="text-danger">Search failed.</span>}{status === "success" && results.map((item) => <div key={item.id}><strong>{item.name}</strong><small>{item.sku}</small></div>)}{status === "success" && !results.length && <span>No matches.</span>}</div></article>;
}

function OptimisticTodo() {
  const [todos, setTodos] = useState([{ id: 1, title: "Review low-stock report", completed: false }, { id: 2, title: "Confirm today’s shipments", completed: true }]);
  const [forceFailure, setForceFailure] = useState(false);
  const pendingVersions = useRef(new Map());
  const { showNotification } = useNotifications();
  async function toggle(todo) {
    const version = (pendingVersions.current.get(todo.id) || 0) + 1;
    pendingVersions.current.set(todo.id, version);
    const optimistic = { ...todo, completed: !todo.completed };
    setTodos((current) => current.map((item) => item.id === todo.id ? optimistic : item));
    try { await updateTodoOnServer(optimistic, forceFailure); }
    catch {
      if (pendingVersions.current.get(todo.id) === version) {
        setTodos((current) => current.map((item) => item.id === todo.id ? todo : item));
        showNotification({ type: "error", message: "Update rejected; the todo was rolled back." });
      }
    }
  }
  return <article className="lab-card"><div className="lab-card-heading"><span><Zap size={20} /></span><div><p>Challenge 36</p><h2>Optimistic todo</h2></div></div><p>The UI updates first. A failed request rolls back only if no newer update has superseded it.</p><label className="toggle-row demo-toggle"><span><strong>Simulate server failure</strong><small>Turn on to observe rollback.</small></span><input type="checkbox" checked={forceFailure} onChange={(event) => setForceFailure(event.target.checked)} /></label><div className="todo-list">{todos.map((todo) => <button type="button" key={todo.id} onClick={() => toggle(todo)} className={todo.completed ? "completed" : ""}><span>{todo.completed ? <CheckCircle2 size={17} /> : <i />}</span>{todo.title}</button>)}</div></article>;
}

function ThrowingWidget() {
  const [shouldThrow, setShouldThrow] = useState(false);
  if (shouldThrow) throw new Error("Intentional render failure");
  return <div className="crash-widget"><p>This widget is isolated by an Error Boundary.</p><button className="button button-danger" type="button" onClick={() => setShouldThrow(true)}><AlertTriangle size={16} /> Trigger render error</button></div>;
}

function ErrorBoundaryDemo() {
  return <article className="lab-card"><div className="lab-card-heading"><span><ShieldAlert size={20} /></span><div><p>Challenge 39</p><h2>Error Boundary</h2></div></div><p>Render/lifecycle failures below the boundary get a recovery UI. Event-handler and asynchronous errors require ordinary error handling.</p><ErrorBoundary><ThrowingWidget /></ErrorBoundary></article>;
}

function ErrorArchitectureDemo() {
  const [status, setStatus] = useState("401");
  const [busy, setBusy] = useState(false);
  const { showNotification } = useNotifications();
  async function run() {
    setBusy(true);
    try { await simulateApiError(Number(status)); }
    catch (error) { showNotification(toUserError(error)); }
    finally { setBusy(false); }
  }
  return <article className="lab-card"><div className="lab-card-heading"><span><Send size={20} /></span><div><p>Challenge 35</p><h2>Structured API errors</h2></div></div><p>Network, 401, 403, 404, 422, and 500 failures become consistent user-facing messages.</p><div className="inline-control"><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="0">Network</option><option>401</option><option>403</option><option>404</option><option>422</option><option>500</option></select><button className="button button-primary" type="button" onClick={run} disabled={busy}>{busy ? "Simulating…" : "Simulate failure"}</button></div></article>;
}

function NotificationDemo() {
  const { showNotification } = useNotifications();
  return <article className="lab-card"><div className="lab-card-heading"><span><BellRing size={20} /></span><div><p>Challenge 34</p><h2>Notification API</h2></div></div><p>Multiple accessible messages can coexist, dismiss automatically, or close manually.</p><div className="notification-buttons">{["success", "error", "warning", "info"].map((type) => <button type="button" key={type} className={`button button-${type === "error" ? "danger" : "ghost"}`} onClick={() => showNotification({ type, message: `${type[0].toUpperCase() + type.slice(1)} notification from showNotification().` })}>{type}</button>)}</div></article>;
}

export default function ChallengeLabPage() {
  return <div className="page-stack"><PageHeader eyebrow="Advanced React" title="Challenge lab" description="Interactive proofs for performance, async correctness, optimistic state, error recovery, and notifications." action={<span className="challenge-score"><Sparkles size={16} /> 6 live demos</span>} /><section className="lab-grid"><PerformanceDemo /><CancellableSearch /><OptimisticTodo /><ErrorBoundaryDemo /><ErrorArchitectureDemo /><NotificationDemo /></section><section className="panel architecture-matrix"><div className="panel-heading"><div><p className="eyebrow">Challenge 26</p><h2>Global state architecture</h2></div></div><div className="matrix-table"><div><strong>Concern</strong><strong>Owner</strong><strong>Reason</strong></div><div><span>Authentication</span><span>Auth Context</span><span>Session is needed by routes and actions.</span></div><div><span>Cart + resources</span><span>AppData reducer</span><span>Transitions are centralized and predictable.</span></div><div><span>Notifications</span><span>Notification Context</span><span>Any feature can publish user feedback.</span></div><div><span>Theme + settings</span><span>Preferences Context</span><span>Cross-cutting and persisted through a custom hook.</span></div><div><span>Form fields</span><span>Local state</span><span>Short-lived state stays near its owner.</span></div></div></section></div>;
}
