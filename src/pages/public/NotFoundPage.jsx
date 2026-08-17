import { Compass } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return <section className="simple-state full-page-state"><Compass size={46} /><p className="eyebrow">404 · Page not found</p><h1>We couldn’t find that page.</h1><p>The address may have changed or the route does not exist.</p><Link className="button button-primary" to="/">Return home</Link></section>;
}
