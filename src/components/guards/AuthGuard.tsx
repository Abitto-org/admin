import { useEffect, type FC, type PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading, fetchUser } = useAuthStore();

  useEffect(() => {
    // Fetch user on mount if not already loaded
    if (!isAuthenticated && !isLoading) {
      fetchUser();
    }
  }, [isAuthenticated, isLoading, fetchUser]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Render protected content
  return <>{children}</>;
};

export default AuthGuard;
