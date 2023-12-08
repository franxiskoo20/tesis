import { yupResolver } from "@hookform/resolvers/yup";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ActionButton from "../../../../components/common/Button/ActionButton";
import ModalLayout from "../../../../components/layout/ModalLayout";
import { useSnackbar } from "../../../../hooks/useSnackbar";
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
  const { handleSubmit, reset, control, watch } = useForm({
    resolver: yupResolver(validationSchemasCustomer),
    mode: "onChange",
    defaultValues: DEFAULT_VALUES_EDIT_CUSTOMER,
  });
  const { showSnackbar } = useSnackbar();

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
  // enviar datos del formulario para editar usuario
  const customerUpdateMutation = useMutation({
    mutationFn: (data) =>
      customerService.updateCustomer(customerToEdit.id, data),
    onError: (error) => {
      const snackbar = CUSTOMER_SNACKBAR.CUSTOMER_EDIT_ERROR;
      showSnackbar(error?.errors || snackbar.message, snackbar.type);
    },
    onSuccess: (data) => {
      const snackbar = CUSTOMER_SNACKBAR.CUSTOMER_EDIT_SUCCESS;
      showSnackbar(data?.message || snackbar.message, snackbar.type);
      onCustomerUpdated?.();
    },
  });

  // enviar datos del formulario para editar usuario
  const onSubmit = (data) => {
    console.log("data: " + data);
    customerUpdateMutation.mutate(data);
  };
  console.log(watch());
  return (
    <ModalLayout title="Editar Cliente" open={open} onClose={onClose}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} my={1} noValidate>
        <Grid container spacing={2}>
          <CustomerFormFields control={control} />
          <Grid xs={12}>
            <ActionButton
              acceptButtonLabel="Agregar"
              acceptButtonIcon={<HowToRegIcon />}
              onCancel={onClose}
              isPending={customerUpdateMutation.isPending}
            />
          </Grid>
        </Grid>
      </Box>
    </ModalLayout>
  );
};

export default CustomerEditModal;
