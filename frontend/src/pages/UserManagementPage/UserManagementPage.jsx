import { useState } from "react";
import UserTable from "../../features/userManagement/components/UserTable/UserTable";
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "../../features/userManagement/services/userService";
import { adaptUserData } from "../../features/userManagement/adapters/adaptUserData";
import UserRegistrationModal from "../../features/userManagement/components/UserModal/UserRegistrationModal";
import UserEditModal from "../../features/userManagement/components/UserModal/UserEditModal";
import LoadingSkeleton from "../../components/common/Loading/LoadingSkeleton";
import useSnackbar from "../../hooks/useSnackbar";
import CustomSnackbar from "../../components/snackbar/CustomSnackbar";

const UserManagementPage = () => {
  const queryClient = useQueryClient();

  const [isRegisterOpen, setIsRegisterOpen] = useState(false); // Estado para abrir o cerrar el modal de registro

  const [isEditOpen, setIsEditOpen] = useState(false); // Estado para abrir o cerrar el modal de edición de usuario
  const [userToEdit, setUserToEdit] = useState(null); // Estado para almacenar el usuario a editar

  const [isSubmitting, setisSubmitting] = useState(false); // Estado para manejar el estado de registro

  const {
    open: openSnackbar,
    message,
    severity,
    showSnackbar,
    closeSnackbar,
  } = useSnackbar();

  // obtener usuarios y adaptarlos
  const {
    data: adaptedUsers,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getUsers,
    select: (data) => data.map(adaptUserData),
  });

  const handleToggleRegister = () => {
    return setIsRegisterOpen(!isRegisterOpen);
  };

  // Función para actualizar la lista de usuarios
  const handleUserAdded = async () => {
    setisSubmitting(true);
    await queryClient.invalidateQueries(["users"]);
    setisSubmitting(false);
    handleToggleRegister();
  };

  // Función para abrir el modal de edición
  const handleOpenEdit = (user) => {
    setUserToEdit(user);
    setIsEditOpen(true);
  };

  // Función para cerrar el modal de edición
  const handleCloseEdit = () => {
    setUserToEdit(false);
  };

  // Función para actualizar la lista de usuarios
  const handleUserUpdated = async () => {
    setisSubmitting(true);
    await queryClient.invalidateQueries(["users"]);
    setisSubmitting(false);
    handleCloseEdit();
  };

  return (
    <AuthenticatedLayout>
      {isLoading ? (
        <LoadingSkeleton />
      ) : isSuccess ? (
        <UserTable
          users={adaptedUsers}
          onAddUser={handleToggleRegister}
          onEdit={handleOpenEdit}
          isSubmitting={isSubmitting}
        />
      ) : (
        // Opcional: manejar el estado de error o vacío
        <div>No hay datos disponibles</div>
      )}
      <UserRegistrationModal
        open={isRegisterOpen}
        onClose={handleToggleRegister}
        onUserAdded={handleUserAdded}
        showSnackbar={showSnackbar}
      />
      {userToEdit && (
        <UserEditModal
          open={isEditOpen}
          onClose={handleCloseEdit}
          userToEdit={userToEdit}
          onUserUpdated={handleUserUpdated}
          showSnackbar={showSnackbar}
        />
      )}
      <CustomSnackbar
        open={openSnackbar}
        setOpen={closeSnackbar}
        message={message}
        severity={severity}
      />
    </AuthenticatedLayout>
  );
};

export default UserManagementPage;
