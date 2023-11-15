import { useEffect, useState } from "react";
import UserTable from "../../components/Table/UserTable";
import AuthenticatedLayout from "../../layout/AuthenticatedLayout";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "../../services/adminService";
import { adaptUserData } from "../../adapters/adaptUserData";

const Users = () => {
  const [adaptedUsers, setAdaptedUsers] = useState([]);

  const { data, isSuccess } = useQuery({
    queryKey: ["users"],
    queryFn: adminService.getUsers,
  });

  useEffect(() => {
    if (isSuccess && data) {
      const adapted = data.map((user) => adaptUserData(user));
      setAdaptedUsers(adapted);
    }
  }, [data, isSuccess]);
 
  {
    isSuccess && console.log(adaptedUsers);
  }
  
  return (
    <AuthenticatedLayout>
      {isSuccess && <UserTable users={adaptedUsers} />}
    </AuthenticatedLayout>
  );
};

export default Users;
