import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const defaultPreferences = {
  theme: "light",
  compactTables: false,
  currency: "USD",
  lowStockThreshold: 8,
  emailSummaries: true,
};

const PreferencesContext = createContext(null);

export function PreferencesProvider({ children }) {
  const [preferences, setPreferences] = useLocalStorage("stockflow-preferences", defaultPreferences);

  useEffect(() => {
    document.documentElement.dataset.theme = preferences.theme;
    document.documentElement.dataset.compact = preferences.compactTables ? "true" : "false";
  }, [preferences.compactTables, preferences.theme]);

  const value = useMemo(() => ({
    preferences: { ...defaultPreferences, ...preferences },
    updatePreferences(updates) {
      setPreferences((current) => ({ ...defaultPreferences, ...current, ...updates }));
    },
    resetPreferences() { setPreferences(defaultPreferences); },
  }), [preferences, setPreferences]);

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error("usePreferences must be used inside PreferencesProvider");
  return context;
}
