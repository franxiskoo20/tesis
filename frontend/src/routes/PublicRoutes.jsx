import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function PublicRoute() {
  const { isAuthenticated } = useAuth(); // Tu hook de autenticación
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}


export default PublicRoute;
