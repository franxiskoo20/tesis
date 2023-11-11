import UserTable from "../components/UserTable";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";

const Users = () => {
  const users = [
    { id: "1", name: "Francisco", email: "prueba" },
    { id: "2", name: "Francisco", email: "prueba" },
  ];
  return (
    <AuthenticatedLayout>
      <UserTable users={users} />;
    </AuthenticatedLayout>
  );
};

export default Users;
