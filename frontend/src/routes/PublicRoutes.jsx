import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoutes = () => {
  const { isAuthenticated } = useAuth(); // Tu hook de autenticación
  return isAuthenticated ? (
    <Navigate to="/app/dashboard" replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoutes;
