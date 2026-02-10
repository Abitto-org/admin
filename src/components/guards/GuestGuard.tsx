import { useEffect, type FC, type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

const GuestGuard: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, fetchUser } = useAuthStore();

  useEffect(() => {
    // Check auth status on mount
    fetchUser();
  }, [fetchUser]);

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Render guest content (login/signup pages)
  return <>{children}</>;
};

export default GuestGuard;
