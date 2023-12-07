import { yupResolver } from "@hookform/resolvers/yup";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ActionButtons from "../../../../components/common/Button/ActionButton";
import ModalLayout from "../../../../components/layout/ModalLayout";
import useAuth from "../../../auth/hooks/useAuth";
import { customerService } from "../../services/customerService";
import { validationSchemasCustomer } from "../../utils/validationSchemasCustomer";
import CustomerFormFields from "../CustomerInputs/CustomerFormFields";

const CustomerAddModal = ({ open, onClose, onCustomerAdded }) => {
  const { user } = useAuth();

  const DEFAULT_VALUES_CUSTOMER = {
    name: "",
    description: "",
    status: false,
    logo: "",
    user_id: user?.id || "",
  };

  const { handleSubmit, reset, control, watch } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchemasCustomer),
    defaultValues: DEFAULT_VALUES_CUSTOMER,
  });

  const addCustomerMutation = useMutation({
    mutationFn: customerService.addCustomer,
    onError: (error) => {
      console.log(error?.errors);
      // showSnackbar(error?.errors || "Error al agregar el cliente", "error");
    },
    onSuccess: () => {
      // showSnackbar(data?.message || "Cliente agregado con éxito", "success");
      onCustomerAdded?.();
      handleClose?.();
    },
  });

  const onSubmit = (data) => {
    addCustomerMutation.mutate(data);
  };
  // Reset campos del formulario al cerrar el modal
  const handleClose = () => {
    reset();
    onClose();
  };
  console.log(watch());
  return (
    <ModalLayout title="Registrar Cliente" open={open} onClose={handleClose}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} my={1} noValidate>
        <Grid container spacing={2}>
          <CustomerFormFields control={control} />
          <Grid xs={12}>
            <ActionButtons
              acceptButtonLabel="Agregar"
              acceptButtonIcon={<HowToRegIcon />}
              onCancel={handleClose}
              isPending={addCustomerMutation.isPending}
            />
          </Grid>
        </Grid>
      </Box>
    </ModalLayout>
  );
};

export default CustomerAddModal;
