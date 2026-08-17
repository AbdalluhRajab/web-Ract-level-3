import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { useNotifications } from "../../contexts/NotificationContext";

const icons = { success: CheckCircle2, error: AlertCircle, warning: AlertTriangle, info: Info };

export function Notifications() {
  const { notifications, dismissNotification } = useNotifications();
  return (
    <div className="notification-region" aria-live="polite" aria-atomic="false">
      {notifications.map((notification) => {
        const Icon = icons[notification.type] || Info;
        return (
          <div className={`notification notification-${notification.type}`} key={notification.id} role={notification.type === "error" ? "alert" : "status"}>
            <Icon size={19} />
            <p>{notification.message}</p>
            <button type="button" onClick={() => dismissNotification(notification.id)} aria-label="Dismiss notification"><X size={17} /></button>
          </div>
        );
      })}
    </div>
  );
}
