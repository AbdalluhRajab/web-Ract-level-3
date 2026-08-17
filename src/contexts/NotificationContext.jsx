import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const nextId = useRef(0);

  const dismissNotification = useCallback((id) => {
    setNotifications((current) => current.filter((item) => item.id !== id));
  }, []);

  const showNotification = useCallback(({ type = "info", message, duration = 4500 }) => {
    const id = ++nextId.current;
    setNotifications((current) => [...current, { id, type, message }]);
    if (duration) window.setTimeout(() => dismissNotification(id), duration);
    return id;
  }, [dismissNotification]);

  const value = useMemo(() => ({ notifications, showNotification, dismissNotification }), [dismissNotification, notifications, showNotification]);
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used inside NotificationProvider");
  return context;
}
