import {
  Fragment,
  Suspense,
  type FC,
  type PropsWithChildren,
  lazy,
} from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

// Layouts
import AuthLayout from "@/components/layouts/AuthLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";

// 404
import NotFound from "@/pages/NotFound";

import App from "./App";
// Auth Page
const Login = lazy(() => import("@/pages/auth/Login"));

// Main Pages
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const LinkRequests = lazy(() => import("@/pages/LinkRequests"));
const Meters = lazy(() => import("@/pages/Meters"));
const Users = lazy(() => import("@/pages/Users"));
const Transactions = lazy(() => import("@/pages/Transactions"));
const HelpCenter = lazy(() => import("@/pages/HelpCenter"));
const Settings = lazy(() => import("@/pages/Settings"));

interface RouteConfig {
  path: string;
  page: FC;
  layout?: FC<PropsWithChildren>;
  guard?: FC<PropsWithChildren>;
}

const routes: RouteConfig[] = [
  {
    path: "/",
    page: App,
  },
  { path: "/auth/login", page: Login, layout: AuthLayout },
  { path: "/dashboard", page: Dashboard, layout: DashboardLayout },
  { path: "/link-requests", page: LinkRequests, layout: DashboardLayout },
  { path: "/meters", page: Meters, layout: DashboardLayout },
  { path: "/users", page: Users, layout: DashboardLayout },
  { path: "/transactions", page: Transactions, layout: DashboardLayout },
  { path: "/help-center", page: HelpCenter, layout: DashboardLayout },
  { path: "/settings", page: Settings, layout: DashboardLayout },
  { path: "*", page: NotFound },
];

export const router = createBrowserRouter(
  routes.map(
    ({
      path,
      layout: Layout = Fragment,
      page: Page,
      guard: Guard = Fragment,
    }) => ({
      path,
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <Guard>
              <Layout>
                <Page />
              </Layout>
            </Guard>
          </ErrorBoundary>
        </Suspense>
      ),
    }),
  ),
);
