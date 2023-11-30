import { useState } from "react";
import UserTable from "../../features/userManagement/components/UserTable/UserTable";
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "../../features/userManagement/services/userService";
import { adaptUserData } from "../../adapters/adaptUserData";
import UserRegistrationModal from "../../features/userManagement/components/UserModal/UserRegistrationModal";
import UserEditModal from "../../features/userManagement/components/UserModal/UserEditModal";

const UserManagement = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false); // Estado para el modal de edición
  const [userToEdit, setUserToEdit] = useState(null); // Estado para almacenar el usuario a editar

  const queryClient = useQueryClient();

  // obtener usuarios y adaptarlos
  const { data: adaptedUsers, isSuccess } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getUsers,
    select: (data) => data.map(adaptUserData),
  });

  const handleOpenRegister = () => setIsRegisterOpen(true);
  const handleCloseRegister = () => setIsRegisterOpen(false);

  const handleUserAdded = () => {
    queryClient.invalidateQueries(["users"]);
    handleCloseRegister();
  };

  const handleOpenEdit = (user) => {
    console.log("usurioResivido: " + user.id);
    setUserToEdit(user);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setUserToEdit(null);
  };

  const handleUserUpdated = () => {
    queryClient.invalidateQueries(["users"]);
    handleCloseEdit();
  };

  return (
    <AuthenticatedLayout>
      {isSuccess && (
        <UserTable
          users={adaptedUsers}
          onAddUser={handleOpenRegister}
          onEdit={handleOpenEdit}
        />
      )}
      <UserRegistrationModal
        open={isRegisterOpen}
        onClose={handleCloseRegister}
        onUserAdded={handleUserAdded}
      />
      {userToEdit && (
        <UserEditModal
          open={isEditOpen}
          onClose={handleCloseEdit}
          userToEdit={userToEdit}
          onUserUpdated={handleUserUpdated}
        />
      )}
    </AuthenticatedLayout>
  );
};

export default UserManagement;
