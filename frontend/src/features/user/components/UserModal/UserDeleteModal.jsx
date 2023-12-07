import { useMutation } from "@tanstack/react-query";
import GenericConfirmModal from "../../../../components/modal/GenericConfirmModal";
import { useSnackbar } from "../../../../hooks/useSnackbar";
import { USER_SNACKBAR } from "../../constants/userSnackbar";
import { userService } from "../../services/userService";

const UserDeleteModal = ({ open, onClose, userToDelete, onUserDelete }) => {
  const { showSnackbar } = useSnackbar();

  const deleteMutation = useMutation({
    mutationFn: (userToDelete) => userService.deleteUser(userToDelete),
    onError: (error) => {
      const snackbar = USER_SNACKBAR.USER_DELETE_ERROR;
      showSnackbar(error?.errors || snackbar.message, snackbar.type);
    },
    onSuccess: (data) => {
      onUserDelete?.();
      const snackbar = USER_SNACKBAR.USER_DELETE_SUCCESS;
      showSnackbar(data?.message || snackbar.message, snackbar.type);
    },
  });
  return (
    <>
      <GenericConfirmModal
        open={open}
        onClose={onClose}
        onConfirm={() => deleteMutation.mutate(userToDelete)}
        title="Confirmar Eliminación"
        confirmButtonText="Eliminar"
        cancelButtonText="Cancelar"
        isPending={deleteMutation.isPending}
      />
    </>
  );
};

export default UserDeleteModal;
