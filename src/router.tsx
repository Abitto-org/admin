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

import App from "./App";
import NotFound from "@/pages/NotFound";

import DashboardLayout from "./components/layouts/DashboardLayout";

const Login = lazy(() => import("@/pages/auth/Login"));

const Dashboard = lazy(() => import("@/pages/Dashboard"));

interface RouteConfig {
  path: string;
  page: FC;
  layout?: FC<PropsWithChildren>;
  guard?: FC<PropsWithChildren>;
}

const routes: RouteConfig[] = [
  {
    path: "/",
    page: () => <App />,
  },
  { path: "/auth/login", page: Login, layout: AuthLayout },
  { path: "/dashboard", page: Dashboard, layout: DashboardLayout },
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
