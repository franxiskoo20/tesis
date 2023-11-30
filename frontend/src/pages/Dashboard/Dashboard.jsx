import useAuth from "../../features/auth/hooks/useAuth";
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";

const Dashboard = () => {
  const { user } = useAuth(); // Este hook debe devolver el estado de autenticación
  return (
    <AuthenticatedLayout>
      <div>Dashboard de {user?.name || "Usuario no disponible"}</div>
    </AuthenticatedLayout>
    // <div>Dashboard de {isAuthenticated}</div>
  );
};

export default Dashboard;
