import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const PublicRoutes = () => {
  const { isAuthenticated } = useAuth(); // Tu hook de autenticación
  return isAuthenticated ? <Navigate to="/app/dashboard" replace /> : <Outlet />;
};

export default PublicRoutes;
