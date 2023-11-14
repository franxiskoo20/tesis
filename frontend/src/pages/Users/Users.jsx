import UserTable from "../../components/Table/UserTable";
import AuthenticatedLayout from "../../layout/AuthenticatedLayout";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "../../services/adminService";

const Users = () => {
  // const users = [
  //   { id: "1", name: "Francisco", email: "prueba" },
  //   { id: "2", name: "Francisco", email: "prueba" },
  // ];

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: adminService.getUsers,
  });
 { isLoading ? console.log("loading") : console.log(users)}

  return (
    <AuthenticatedLayout>
      {/* {!isLoading && console.log(data)} */}
      {!isLoading && <UserTable users={users} />}
    </AuthenticatedLayout>
  );
};

export default Users;
