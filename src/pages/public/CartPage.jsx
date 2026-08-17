import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppData } from "../../contexts/AppDataContext";
import { useNotifications } from "../../contexts/NotificationContext";
import { formatCurrency } from "../../utils/formatters";

export default function CartPage() {
  const { state, dispatch } = useAppData();
  const { showNotification } = useNotifications();
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const checkout = () => { showNotification({ type: "info", message: "Checkout is outside this inventory demo." }); };
  return (
    <section className="cart-page"><div className="catalog-header"><p className="eyebrow">Saved locally</p><h1>Your cart</h1><p>Cart state is shared through the application reducer.</p></div>{state.cart.length === 0 ? <div className="simple-state"><ShoppingBag size={42} /><h2>Your cart is empty</h2><p>Add an item from the public catalog to see global cart state in action.</p><Link className="button button-primary" to="/products">Browse products</Link></div> : <div className="cart-layout"><div className="cart-list">{state.cart.map((item) => <article key={item.productId}><span className="product-avatar large">{item.name.slice(0, 2).toUpperCase()}</span><div><h2>{item.name}</h2><p>{formatCurrency(item.price)} each</p></div><div className="quantity-control"><button onClick={() => dispatch({ type: "SET_CART_QUANTITY", productId: item.productId, quantity: item.quantity - 1 })} aria-label="Decrease quantity"><Minus size={15} /></button><span>{item.quantity}</span><button onClick={() => dispatch({ type: "SET_CART_QUANTITY", productId: item.productId, quantity: item.quantity + 1 })} aria-label="Increase quantity"><Plus size={15} /></button></div><strong>{formatCurrency(item.price * item.quantity)}</strong><button className="icon-button danger" onClick={() => dispatch({ type: "REMOVE_FROM_CART", productId: item.productId })} aria-label={`Remove ${item.name}`}><Trash2 size={17} /></button></article>)}</div><aside className="cart-summary"><p className="eyebrow">Order summary</p><h2>{state.cart.reduce((sum, item) => sum + item.quantity, 0)} items</h2><div><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div><div><span>Shipping</span><strong>Free</strong></div><div className="summary-total"><span>Total</span><strong>{formatCurrency(subtotal)}</strong></div><button className="button button-primary button-large" onClick={checkout}>Continue <ArrowRight size={18} /></button></aside></div>}</section>
  );
}
