import { ArrowRight, BarChart3, Boxes, Check, Layers3, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { Link } from "react-router-dom";
import { seedProducts } from "../../data/seed";
import { formatCurrency } from "../../utils/formatters";

const features = [
  { icon: Boxes, title: "Inventory control", text: "Reusable CRUD tools, low-stock signals, and fast catalog search." },
  { icon: BarChart3, title: "Sales intelligence", text: "Derived KPIs, revenue trends, best sellers, and customer insight." },
  { icon: ShieldCheck, title: "Role-aware access", text: "Protected routes and action-level permissions for four user roles." },
];

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy"><div className="announcement"><Sparkles size={15} /> Production-style React capstone</div><h1>Inventory that stays <em>one step ahead.</em></h1><p>StockFlow unifies products, orders, customers, and live performance signals in one focused workspace built for modern retail teams.</p><div className="hero-buttons"><Link className="button button-primary button-large" to="/login">Explore the dashboard <ArrowRight size={18} /></Link><Link className="button button-ghost button-large" to="/products">Browse products</Link></div><div className="hero-proof"><span><Check size={15} /> Local-first demo</span><span><Check size={15} /> Four access roles</span><span><Check size={15} /> Fully responsive</span></div></div>
        <div className="hero-visual" aria-label="Dashboard preview">
          <div className="preview-window"><div className="preview-sidebar"><span className="preview-logo" /><i /><i /><i /><i /></div><div className="preview-content"><div className="preview-top"><span /><span /></div><div className="preview-title"><small>WEEKLY OVERVIEW</small><strong>Sales at a glance</strong></div><div className="preview-metrics"><div><small>Revenue</small><strong>$2,068</strong><em>+12.4%</em></div><div><small>Orders</small><strong>8</strong><em>+8.2%</em></div><div><small>Low stock</small><strong>4</strong><em className="negative">Action</em></div></div><div className="preview-chart">{[38, 55, 29, 70, 48, 85, 65].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}</div></div></div>
          <div className="floating-card floating-stock"><span><Boxes size={18} /></span><div><small>Inventory value</small><strong>$42,860</strong></div></div>
          <div className="floating-card floating-order"><span><Check size={17} /></span><div><small>Order fulfilled</small><strong>#ORD-2048</strong></div></div>
        </div>
      </section>
      <section className="logo-strip"><p>Designed around the workflows of modern commerce teams</p><div><span>NORTHSTAR</span><span>AXIS LABS</span><span>LUMEN</span><span>MONO WORKS</span><span>SAFFRON</span></div></section>
      <section className="feature-section"><div className="section-heading"><p className="eyebrow">One operating system</p><h2>Every signal, exactly where you need it.</h2><p>Clear architecture underneath. Calm workflows on the surface.</p></div><div className="feature-grid">{features.map((feature) => <article key={feature.title}><span><feature.icon size={24} /></span><h3>{feature.title}</h3><p>{feature.text}</p></article>)}</div></section>
      <section className="product-showcase"><div className="section-heading left"><p className="eyebrow">Catalog preview</p><h2>Fast-moving essentials</h2></div><div className="showcase-grid">{seedProducts.slice(0, 4).map((product, index) => <Link to={`/products/${product.id}`} key={product.id} className={`showcase-card product-tone-${index % 4}`}><span className="showcase-art">{product.name.split(" ").map((word) => word[0]).slice(0, 2).join("")}</span><small>{product.category}</small><h3>{product.name}</h3><div><strong>{formatCurrency(product.price)}</strong><span>{product.stock} in stock</span></div></Link>)}</div><div className="center-action"><Link className="text-link" to="/products">View the full catalog <ArrowRight size={16} /></Link></div></section>
      <section className="architecture-callout"><div><span><Layers3 size={22} /></span><p className="eyebrow">Built to scale</p><h2>Reusable systems, not repeated screens.</h2><p>A generic resource manager powers products, customers, categories, brands, and users while keeping validation and field definitions resource-specific.</p><Link className="button button-light" to="/login">Open admin workspace <ArrowRight size={17} /></Link></div><div className="architecture-list"><div><Workflow size={19} /><span><strong>Feature architecture</strong><small>Pages, contexts, hooks, services, and pure utilities</small></span></div><div><ShieldCheck size={19} /><span><strong>Permission layer</strong><small>Route guards plus action-level checks</small></span></div><div><BarChart3 size={19} /><span><strong>Derived analytics</strong><small>Raw records remain the single source of truth</small></span></div></div></section>
    </>
  );
}
