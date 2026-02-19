import useAuth from "@/hooks/auth";
import { Navigate, Outlet } from "react-router";

const ProtectedLayout = () => {
  const { isAuthenticated, isInitialized, isLoading } = useAuth();

  if (!isInitialized || isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
