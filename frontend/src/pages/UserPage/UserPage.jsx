import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import LoadingSkeleton from "../../components/common/Loading/LoadingSkeleton";
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";
import { adaptUserData } from "../../features/user/adapters/adaptUserData";
import UserDeleteModal from "../../features/user/components/UserModal/UserDeleteModal";
import UserEditModal from "../../features/user/components/UserModal/UserEditModal";
import UserRegistrationModal from "../../features/user/components/UserModal/UserRegistrationModal";
import UserTable from "../../features/user/components/UserTable/UserTable";
import { userService } from "../../features/user/services/userService";

const UserPage = () => {
  const queryClient = useQueryClient();

  const [modalState, setModalState] = useState({
    isRegisterOpen: false,
    isEditOpen: false,
    isDeleteOpen: false,
    userToAction: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // obtener usuarios y adaptarlos
  const { data: adaptedUsers, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getUsers,
    select: (data) => data.map(adaptUserData),
  });

  const toggleModal = (modalType) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalType]: !prevState[modalType],
    }));
  };

  const handleUserAction = async (actionType) => {
    toggleModal(actionType);
    setIsSubmitting(true);
    await queryClient.invalidateQueries(["users"]);
    setIsSubmitting(false);
  };

  return (
    <AuthenticatedLayout>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <UserTable
          users={adaptedUsers}
          onAddUser={() => toggleModal("isRegisterOpen")}
          onEdit={(user) =>
            setModalState({
              ...modalState,
              isEditOpen: true,
              userToAction: user,
            })
          }
          onDelete={(user) =>
            setModalState({
              ...modalState,
              isDeleteOpen: true,
              userToAction: user,
            })
          }
          isSubmitting={isSubmitting}
        />
      )}
      <UserRegistrationModal
        open={modalState.isRegisterOpen}
        onClose={() => toggleModal("isRegisterOpen")}
        onUserAdded={() => handleUserAction("isRegisterOpen")}
      />
      {modalState.userToAction && (
        <UserEditModal
          open={modalState.isEditOpen}
          onClose={() =>
            setModalState({ isEditOpen: false, userToAction: null })
          }
          userToEdit={modalState.userToAction}
          onUserUpdated={() => handleUserAction("isEditOpen")}
        />
      )}
      {modalState.userToAction && (
        <UserDeleteModal
          open={modalState.isDeleteOpen}
          onClose={() =>
            setModalState({ isDeleteOpen: false, userToAction: null })
          }
          userToDelete={modalState.userToAction}
          onUserDelete={() => handleUserAction("isDeleteOpen")}
        />
      )}
    </AuthenticatedLayout>
  );
};

export default UserPage;
