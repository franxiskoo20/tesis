import GenericConfirmModal from "../../../../components/modal/GenericConfirmModal";
import useGenericMutation from "../../../../hooks/useGenericMutation";
import { RATE_SNACKBAR } from "../../constants/rateSnackbar";
import { rateService } from "../../services/rateService";

const RateEditStatusModal = ({ open, onClose, toEdit, onEdit }) => {
  const updateMutation = useGenericMutation({
    mutationFn: (toEdit) => rateService.updateStatus(toEdit),
    successMessage: RATE_SNACKBAR.RATE_EDIT_SUCCESS.message,
    errorMessage: RATE_SNACKBAR.RATE_EDIT_ERROR.message,
    onSuccessCallback: () => {
      onClose?.();
      onEdit?.();
    },
  });

  return (
    <>
      <GenericConfirmModal
        open={open}
        onClose={onClose}
        onConfirm={() => updateMutation.mutate(toEdit)}
        title="Confirmar Cambio de Estado"
        message="¿Estás seguro de que quieres cambiar el Estado de la Tarifa a Inactiva?"
        isPending={updateMutation.isPending}
      />
    </>
  );
};

export default RateEditStatusModal;
