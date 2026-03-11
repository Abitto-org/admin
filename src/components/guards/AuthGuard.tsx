import { useEffect, type FC, type PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { getEffectiveRole, PAGE_ACCESS } from "@/hooks/usePermissions";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading, fetchUser, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      fetchUser();
    }
  }, [isAuthenticated, isLoading, fetchUser]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Role-based page protection
  const role = user ? getEffectiveRole(user) : null;
  const currentPath = location.pathname;

  // Normalise dynamic segments e.g. /users/123 → /users/:userId
  const normalisedPath = currentPath.replace(
    /\/users\/[^/]+/,
    "/users/:userId",
  );

  const allowedRoles = PAGE_ACCESS[normalisedPath] ?? PAGE_ACCESS[currentPath];

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    // Send installer to their home, everyone else to dashboard
    const fallback = role === "installer" ? "/link-requests" : "/dashboard";
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
