import { type FC, type PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { usePermissions } from "@/hooks/usePermissions";
import { useAuthStore } from "@/store/auth.store";

/**
 * Wraps a route and redirects the user if they don't have access.
 * - Not authenticated → /auth/login
 * - Authenticated but wrong role → /dashboard (or /meters for installer)
 *
 * Usage in router:
 *   { path: "/admin", page: AdminandRoles, layout: DashboardLayout, guard: AuthGuard }
 *   — replace AuthGuard with RoleProtectedRoute for role-aware protection,
 *   OR nest RoleProtectedRoute inside the page itself.
 *
 * Recommended: Use this as a standalone guard component at the route level.
 */
interface RoleProtectedRouteProps extends PropsWithChildren {
  allowedRoles: import("@/hooks/usePermissions").AppRole[];
  redirectTo?: string;
}

export const RoleProtectedRoute: FC<RoleProtectedRouteProps> = ({
  allowedRoles,
  redirectTo,
  children,
}) => {
  const { isAuthenticated } = useAuthStore();
  const { hasRole, isInstaller } = usePermissions();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (!hasRole(...allowedRoles)) {
    // Installers get sent to their home base
    const fallback = redirectTo ?? (isInstaller ? "/meters" : "/dashboard");
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;
