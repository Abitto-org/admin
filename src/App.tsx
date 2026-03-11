import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { getEffectiveRole } from "@/hooks/usePermissions";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const getRoleHome = (role: string | null): string => {
  if (role === "installer") return "/link-requests";
  return "/dashboard";
};

function App() {
  const { isAuthenticated, isLoading, fetchUser, user } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  const role = user ? getEffectiveRole(user) : null;
  return <Navigate to={getRoleHome(role)} replace />;
}

export default App;
