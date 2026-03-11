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

// Guards
import AuthGuard from "@/components/guards/AuthGuard";

// Layouts
import AuthLayout from "@/components/layouts/AuthLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";

// 404
import NotFound from "@/pages/NotFound";

import App from "./App";

// Auth Pages
const Login = lazy(() => import("@/pages/auth/Login"));
const VerifyOTP = lazy(() => import("@/pages/auth/VerifyOTP"));
const CompleteSetup = lazy(() => import("@/pages/auth/CompleteSetup"));

// Main Pages
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const LinkRequests = lazy(() => import("@/pages/LinkRequests"));
const Meters = lazy(() => import("@/pages/Meters"));
const Estates = lazy(() => import("@/pages/Estates"));
const Users = lazy(() => import("@/pages/Users"));
const Transactions = lazy(() => import("@/pages/Transactions"));
const Incidents = lazy(() => import("@/pages/Incidents"));
const AdminandRoles = lazy(() => import("@/pages/Admin&Roles"));
const HelpCenter = lazy(() => import("@/pages/HelpCenter"));
const Settings = lazy(() => import("@/pages/Settings"));

interface RouteConfig {
  path: string;
  page: FC;
  layout?: FC<PropsWithChildren>;
  guard?: FC<PropsWithChildren>;
  children?: RouteConfig[];
}

const routes: RouteConfig[] = [
  { path: "/", page: App },
  { path: "/auth/login", page: Login, layout: AuthLayout },
  { path: "/auth/verify-otp", page: VerifyOTP, layout: AuthLayout },
  { path: "/invite", page: CompleteSetup, layout: AuthLayout },
  {
    path: "/dashboard",
    page: Dashboard,
    layout: DashboardLayout,
    guard: AuthGuard,
  },
  {
    path: "/link-requests",
    page: LinkRequests,
    layout: DashboardLayout,
    guard: AuthGuard,
  },
  { path: "/meters", page: Meters, layout: DashboardLayout, guard: AuthGuard },
  {
    path: "/estates",
    page: Estates,
    layout: DashboardLayout,
    guard: AuthGuard,
  },
  { path: "/users", page: Users, layout: DashboardLayout, guard: AuthGuard },
  {
    path: "/users/:userId",
    page: Users,
    layout: DashboardLayout,
    guard: AuthGuard,
  },
  {
    path: "/transactions",
    page: Transactions,
    layout: DashboardLayout,
    guard: AuthGuard,
  },
  {
    path: "/incidents",
    page: Incidents,
    layout: DashboardLayout,
    guard: AuthGuard,
  },
  {
    path: "/admin",
    page: AdminandRoles,
    layout: DashboardLayout,
    guard: AuthGuard,
  },
  {
    path: "/help-center",
    page: HelpCenter,
    layout: DashboardLayout,
    guard: AuthGuard,
  },
  {
    path: "/settings",
    page: Settings,
    layout: DashboardLayout,
    guard: AuthGuard,
  },
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
