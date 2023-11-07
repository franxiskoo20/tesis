import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth(); // Este hook debe devolver el estado de autenticación
  console.log("protect" + isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
