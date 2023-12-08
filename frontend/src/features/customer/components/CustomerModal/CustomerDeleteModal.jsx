import { useMutation } from "@tanstack/react-query";
import GenericConfirmModal from "../../../../components/modal/GenericConfirmModal";
import { useSnackbar } from "../../../../hooks/useSnackbar";
import { CUSTOMER_SNACKBAR } from "../../constants/customerSnackbar";
import { customerService } from "../../services/customerService";

const CustomerDeleteModal = ({
  open,
  onClose,
  customerToDelete,
  onCustomerDelete,
}) => {
  const { showSnackbar } = useSnackbar();

  const deleteMutation = useMutation({
    mutationFn: (customerToDelete) =>
      customerService.deleteCustomer(customerToDelete),
    onError: (error) => {
      const snackbar = CUSTOMER_SNACKBAR.CUSTOMER_DELETE_ERROR;
      showSnackbar(error?.errors || snackbar.message, snackbar.type);
    },
    onSuccess: (data) => {
      onCustomerDelete?.();
      const snackbar = CUSTOMER_SNACKBAR.CUSTOMER_DELETE_SUCCESS;
      showSnackbar(data?.message || snackbar.message, snackbar.type);
    },
  });
  return (
    <>
      <GenericConfirmModal
        open={open}
        onClose={onClose}
        onConfirm={() => deleteMutation.mutate(customerToDelete)}
        title="Confirmar Eliminación"
        confirmButtonText="Eliminar"
        cancelButtonText="Cancelar"
        isPending={deleteMutation.isPending}
      />
    </>
  );
};

export default CustomerDeleteModal;
