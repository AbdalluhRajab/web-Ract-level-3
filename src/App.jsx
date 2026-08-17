import { lazy, Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { PublicLayout } from "./layouts/PublicLayout";
import CartPage from "./pages/public/CartPage";
import CustomerPage from "./pages/public/CustomerPage";
import HomePage from "./pages/public/HomePage";
import LoginPage from "./pages/public/LoginPage";
import NotFoundPage from "./pages/public/NotFoundPage";
import ProductDetailsPage from "./pages/public/ProductDetailsPage";
import ProductsPage from "./pages/public/ProductsPage";
import UnauthorizedPage from "./pages/public/UnauthorizedPage";
import OrdersPage from "./pages/dashboard/OrdersPage";
import ResourcePage from "./pages/dashboard/ResourcePage";

const OverviewPage = lazy(() => import("./pages/dashboard/OverviewPage"));
const ReportsPage = lazy(() => import("./pages/dashboard/ReportsPage"));
const AnalyticsPage = lazy(() => import("./pages/dashboard/AnalyticsPage"));
const SettingsPage = lazy(() => import("./pages/dashboard/SettingsPage"));
const ChallengeLabPage = lazy(() => import("./pages/dashboard/ChallengeLabPage"));

function RouteFallback() {
  return <div className="route-loading" role="status"><LoaderCircle className="spin" /><span>Loading this section…</span></div>;
}

const lazyPage = (page) => <Suspense fallback={<RouteFallback />}>{page}</Suspense>;

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="unauthorized" element={<UnauthorizedPage />} />
          <Route element={<ProtectedRoute permission="customer:view" />}><Route path="customer" element={<CustomerPage />} /></Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route element={<ProtectedRoute permission="dashboard:view" />}><Route index element={lazyPage(<OverviewPage />)} /></Route>
            <Route element={<ProtectedRoute permission="products:view" />}><Route path="products" element={<ResourcePage resource="products" />} /></Route>
            <Route element={<ProtectedRoute permission="orders:view" />}><Route path="orders" element={<OrdersPage />} /></Route>
            <Route element={<ProtectedRoute permission="*" />}>
              <Route path="customers" element={<ResourcePage resource="customers" />} />
              <Route path="categories" element={<ResourcePage resource="categories" />} />
              <Route path="brands" element={<ResourcePage resource="brands" />} />
              <Route path="users" element={<ResourcePage resource="employees" />} />
              <Route path="lab" element={lazyPage(<ChallengeLabPage />)} />
            </Route>
            <Route element={<ProtectedRoute permission="reports:view" />}><Route path="reports" element={lazyPage(<ReportsPage />)} /></Route>
            <Route element={<ProtectedRoute permission="analytics:view" />}><Route path="analytics" element={lazyPage(<AnalyticsPage />)} /></Route>
            <Route path="settings" element={lazyPage(<SettingsPage />)} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Route>
        <Route path="/404" element={<PublicLayout />}><Route index element={<NotFoundPage />} /></Route>
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </ErrorBoundary>
  );
}
