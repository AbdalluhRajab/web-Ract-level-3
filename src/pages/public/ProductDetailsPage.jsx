import { ArrowLeft, Box, CheckCircle2, ShoppingBag, Truck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { catalogProducts } from "../../data/seed";
import { useAppData } from "../../contexts/AppDataContext";
import { useNotifications } from "../../contexts/NotificationContext";
import { formatCurrency } from "../../utils/formatters";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { state, dispatch } = useAppData();
  const { showNotification } = useNotifications();
  const product = state.products.find((item) => item.id === id) || catalogProducts.find((item) => item.id === id);
  if (!product) return <section className="simple-state"><Box size={42} /><h1>Product not found</h1><p>The product may have been removed from this local demo.</p><Link className="button button-primary" to="/products">Back to products</Link></section>;

  const addToCart = () => { dispatch({ type: "ADD_TO_CART", product }); showNotification({ type: "success", message: `${product.name} added to cart.` }); };
  return (
    <section className="product-details-page"><Link className="back-link" to="/products"><ArrowLeft size={16} /> Back to products</Link><div className="product-details-grid"><div className="product-detail-art"><span>{product.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span><small>{product.sku}</small></div><div className="product-detail-copy"><p className="eyebrow">{product.category} · {product.brand}</p><h1>{product.name}</h1><p className="product-lead">A carefully selected workspace essential, tracked through StockFlow’s unified inventory system.</p><strong className="product-price">{formatCurrency(product.price)}</strong><div className="product-benefits"><span><CheckCircle2 size={17} /> {product.stock} units in stock</span><span><Truck size={17} /> Ships in 1–2 business days</span><span><Box size={17} /> SKU {product.sku}</span></div><button className="button button-primary button-large" onClick={addToCart} disabled={product.stock === 0}><ShoppingBag size={18} /> Add to cart</button></div></div></section>
  );
}
