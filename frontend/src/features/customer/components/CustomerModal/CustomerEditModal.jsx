import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ActionModal from "../../../../components/modal/ActionModal";
import useGenericMutation from "../../../../hooks/useGenericMutation";
import useAuth from "../../../auth/hooks/useAuth";
import { CUSTOMER_SNACKBAR } from "../../constants/customerSnackbar";
import { customerService } from "../../services/customerService";
import { validationSchemasCustomer } from "../../utils/validationSchemasCustomer";
import CustomerFormFields from "../CustomerInputs/CustomerFormFields";

const CustomerEditModal = ({
  open,
  onClose,
  customerToEdit,
  onCustomerUpdated,
}) => {
  const { user } = useAuth();
  const DEFAULT_VALUES_EDIT_CUSTOMER = {
    name: "",
    description: "",
    status: false,
    logo: "",
    user_id: user?.id || "",
  };

  // formulario react-hook-form
  const { handleSubmit, reset, control } = useForm({
    resolver: yupResolver(validationSchemasCustomer),
    mode: "onChange",
    defaultValues: DEFAULT_VALUES_EDIT_CUSTOMER,
  });

  // cargar datos del usuario a editar
  useEffect(() => {
    if (customerToEdit) {
      reset({
        name: customerToEdit.name,
        description: customerToEdit.description,
        status: Boolean(customerToEdit.status),
        logo: undefined,
        user_id: user?.id || "",
      });
    }
  }, [customerToEdit, reset, user]);

  const customerUpdateMutation = useGenericMutation({
    mutationFn: (data) =>
      customerService.updateCustomer(customerToEdit.id, data),
    successMessage: CUSTOMER_SNACKBAR.CUSTOMER_EDIT_ERROR.message,
    errorMessage: CUSTOMER_SNACKBAR.CUSTOMER_EDIT_ERROR.message,
    onSuccessCallback: () => {
      onClose?.();
      onCustomerUpdated?.();
    },
  });

  // enviar datos del formulario para editar usuario
  const onSubmit = (data) => {
    customerUpdateMutation.mutate(data);
  };

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="Registrar Cliente"
      onSubmit={handleSubmit(onSubmit)}
      isPending={customerUpdateMutation.isPending}
      submitLabel="Agregar"
    >
      <CustomerFormFields control={control} />
    </ActionModal>
  );
};

export default CustomerEditModal;
