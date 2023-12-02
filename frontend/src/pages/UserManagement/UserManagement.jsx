import { useState } from "react";
import UserTable from "../../features/userManagement/components/UserTable/UserTable";
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "../../features/userManagement/services/userService";
import { adaptUserData } from "../../features/userManagement/adapters/adaptUserData";
import UserRegistrationModal from "../../features/userManagement/components/UserModal/UserRegistrationModal";
import UserEditModal from "../../features/userManagement/components/UserModal/UserEditModal";
import LoadingSkeleton from "../../components/common/Loading/LoadingSkeleton";

/**
 *
 * TODO: agregar manejo de errores
 *
 */
const UserManagement = () => {
  const queryClient = useQueryClient();

  const [isRegisterOpen, setIsRegisterOpen] = useState(false); // Estado para abrir o cerrar el modal de registro

  const [isEditOpen, setIsEditOpen] = useState(false); // Estado para abrir o cerrar el modal de edición de usuario
  const [userToEdit, setUserToEdit] = useState(false); // Estado para almacenar el usuario a editar

  const [isRegistering, setIsRegistering] = useState(false); // Estado para manejar el estado de registro

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

  // Función para abrir el modal de registro y cerrarlo
  const handleOpenRegister = () => setIsRegisterOpen(true);

  const handleCloseRegister = () => setIsRegisterOpen(false);

  // Función para actualizar la lista de usuarios
  const handleUserAdded = async () => {
    setIsRegistering(true);
    await queryClient.invalidateQueries(["users"]);
    setIsRegistering(false);
    handleCloseRegister();
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
  const handleUserUpdated = () => {
    queryClient.invalidateQueries(["users"]);
    handleCloseEdit();
  };

  return (
    <AuthenticatedLayout>
      {isLoading ? (
        <LoadingSkeleton />
      ) : isSuccess ? (
        <UserTable
          users={adaptedUsers}
          onAddUser={handleOpenRegister}
          onEdit={handleOpenEdit}
          isRegistering={isRegistering}
        />
      ) : (
        // Opcional: manejar el estado de error o vacío
        <div>No hay datos disponibles</div>
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
