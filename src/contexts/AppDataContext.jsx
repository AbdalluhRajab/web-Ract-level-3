import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { initialData } from "../data/seed";
import { dataReducer } from "../reducers/dataReducer";

const AppDataContext = createContext(null);
const storageKey = "stockflow-data-v1";

function loadInitialData() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(storageKey));
    return stored && typeof stored === "object" ? { ...initialData, ...stored } : initialData;
  } catch {
    return initialData;
  }
}

export function AppDataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, undefined, loadInitialData);

  useEffect(() => {
    try { window.localStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* Storage is an enhancement. */ }
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) throw new Error("useAppData must be used inside AppDataProvider");
  return context;
}
