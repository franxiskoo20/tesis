import GenericConfirmModal from "../../../../components/modal/GenericConfirmModal";
import useGenericMutation from "../../../../hooks/useGenericMutation";
import { RATE_SNACKBAR } from "../../constants/rateSnackbar";
import { rateService } from "../../services/rateService";

const RateDeleteModal = ({ open, onClose, toDelete, onDelete }) => {
  const deleteMutation = useGenericMutation({
    mutationFn: (toDelete) => rateService.deleteRate(toDelete),
    successMessage: RATE_SNACKBAR.RATE_DELETE_SUCCESS.message,
    errorMessage: RATE_SNACKBAR.RATE_DELETE_ERROR.message,
    onSuccessCallback: () => {
      onClose?.();
      onDelete?.();
    },
  });

  return (
    <>
      <GenericConfirmModal
        open={open}
        onClose={onClose}
        onConfirm={() => deleteMutation.mutate(toDelete)}
        title="Confirmar Eliminación"
        confirmButtonText="Eliminar"
        cancelButtonText="Cancelar"
        isPending={deleteMutation.isPending}
      />
    </>
  );
};

export default RateDeleteModal;
