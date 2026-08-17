import { useState } from "react";
import { ArrowRight, Check, KeyRound, Package2, ShieldCheck } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { landingPathForRole } from "../../utils/permissions";

const credentials = {
  Admin: ["admin@stockflow.dev", "admin123"],
  Manager: ["manager@stockflow.dev", "manager123"],
  Employee: ["employee@stockflow.dev", "employee123"],
  Customer: ["customer@stockflow.dev", "customer123"],
};

export default function LoginPage() {
  const { user, login, loginAs } = useAuth();
  const [email, setEmail] = useState(credentials.Admin[0]);
  const [password, setPassword] = useState(credentials.Admin[1]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  if (user) return <Navigate to={landingPathForRole(user.role)} replace />;

  function submit(event) {
    event.preventDefault();
    try {
      const account = login(email, password);
      const requested = location.state?.from?.pathname;
      navigate(requested && account.role !== "Customer" ? requested : landingPathForRole(account.role), { replace: true });
    } catch (loginError) { setError(loginError.message); }
  }

  function useDemo(role) {
    const account = loginAs(role);
    navigate(landingPathForRole(account.role), { replace: true });
  }

  return (
    <section className="login-page"><div className="login-promo"><div><span className="login-badge"><ShieldCheck size={16} /> Secure demo access</span><h1>Run the whole operation from one calm workspace.</h1><p>Choose a role to test both route-level and action-level permissions.</p><ul><li><Check size={17} /> Protected dashboard routes</li><li><Check size={17} /> Role-specific navigation</li><li><Check size={17} /> Persistent local session</li></ul></div><div className="login-quote"><p>“The same interface adapts to four permission levels without mixing authorization logic into page UI.”</p><span>Challenge 24 + 25</span></div></div><div className="login-form-side"><div className="login-card"><div className="login-brand"><span className="brand-mark"><Package2 size={21} /></span><span>Stock<span>Flow</span></span></div><p className="eyebrow">Welcome back</p><h2>Sign in to your workspace</h2><p>Use the pre-filled admin account or select a demo role.</p><form onSubmit={submit}><label><span>Email address</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label><span>Password</span><div className="input-with-icon"><KeyRound size={17} /><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div></label>{error && <p className="login-error" role="alert">{error}</p>}<button className="button button-primary button-large" type="submit">Sign in <ArrowRight size={18} /></button></form><div className="demo-divider"><span>or enter as</span></div><div className="role-grid">{Object.keys(credentials).map((role) => <button type="button" key={role} onClick={() => useDemo(role)}>{role}</button>)}</div><small className="login-note">Demo only. No data leaves your browser.</small></div></div></section>
  );
}
