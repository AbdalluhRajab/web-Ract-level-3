import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AppDataProvider } from "./contexts/AppDataContext";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { PreferencesProvider } from "./contexts/PreferencesContext";
import { Notifications } from "./components/ui/Notifications";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PreferencesProvider>
        <NotificationProvider>
          <AuthProvider>
            <AppDataProvider>
              <App />
              <Notifications />
            </AppDataProvider>
          </AuthProvider>
        </NotificationProvider>
      </PreferencesProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
