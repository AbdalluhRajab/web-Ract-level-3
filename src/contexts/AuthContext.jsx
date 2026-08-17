import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const accounts = [
  { id: "u-1", name: "Nour Haddad", email: "admin@stockflow.dev", password: "admin123", role: "Admin" },
  { id: "u-2", name: "Sami Qasem", email: "manager@stockflow.dev", password: "manager123", role: "Manager" },
  { id: "u-3", name: "Rana Issa", email: "employee@stockflow.dev", password: "employee123", role: "Employee" },
  { id: "u-4", name: "Maya Khalil", email: "customer@stockflow.dev", password: "customer123", role: "Customer" },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("stockflow-session", null);

  const value = useMemo(() => ({
    user,
    accounts: accounts.map(({ password: _password, ...account }) => account),
    login(email, password) {
      const account = accounts.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
      if (!account) throw new Error("Email or password is incorrect.");
      const { password: _password, ...safeAccount } = account;
      setUser(safeAccount);
      return safeAccount;
    },
    loginAs(role) {
      const account = accounts.find((item) => item.role === role);
      const { password: _password, ...safeAccount } = account;
      setUser(safeAccount);
      return safeAccount;
    },
    logout() { setUser(null); },
  }), [setUser, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
