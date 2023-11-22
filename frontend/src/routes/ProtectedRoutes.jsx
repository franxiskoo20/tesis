import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../features/auth/useAuth";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth(); // Este hook debe devolver el estado de autenticación

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
