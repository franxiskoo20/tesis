import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";
import useAuth from "../../features/auth/hooks/useAuth";

const DashboardPage = () => {
  const { user } = useAuth(); // Este hook debe devolver el estado de autenticación
  return (
    <AuthenticatedLayout>
      <div>Dashboard de {user?.name || "Usuario no disponible"}</div>
    </AuthenticatedLayout>
    // <div>Dashboard de {isAuthenticated}</div>
  );
};

export default DashboardPage;
