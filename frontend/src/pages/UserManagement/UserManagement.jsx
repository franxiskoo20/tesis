import { useState } from "react";
import UserTable from "../../components/Table/UserTable";
import AuthenticatedLayout from "../../layout/AuthenticatedLayout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../../services/adminService";
import { adaptUserData } from "../../adapters/adaptUserData";
import UserRegistrationModal from "../../components/UserRegistrationModal";

const UserManagement = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  // const [adaptedUsers, setAdaptedUsers] = useState([]);

  const queryClient = useQueryClient();

  const { data: adaptedUsers, isSuccess } = useQuery({
    queryKey: ["users"],
    queryFn: adminService.getUsers,
    select: (data) => data.map(adaptUserData),
  });

  const handleOpenRegister = () => setIsRegisterOpen(true);
  const handleCloseRegister = () => setIsRegisterOpen(false);

  const handleUserAdded = () => {
    queryClient.invalidateQueries(["users"]);
    handleCloseRegister();
  };

  return (
    <AuthenticatedLayout>
      {isSuccess && (
        <UserTable users={adaptedUsers} onAddUser={handleOpenRegister} />
      )}
      <UserRegistrationModal
        open={isRegisterOpen}
        onClose={handleCloseRegister}
        onUserAdded={handleUserAdded}
      />
    </AuthenticatedLayout>
  );
};

export default UserManagement;
