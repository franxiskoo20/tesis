import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { customerService } from "../../services/customerService";
import CustomerFormFields from "../CustomerInputs/CustomerFormFields";
import { Grid, Box } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalLayout from "../../../../components/layout/ModalLayout";
import ActionButtons from "../../../../components/common/buttons/ActionButtons";
import { validationSchemasCustomer } from "../../utils/validationSchemasCustomer";

const DEFAULT_VALUES_CUSTOMER = {
  name: "",
  description: "",
  status: "true",
  logo: "",
  user_id: "",
};

const CustomerAddModal = ({ open, onClose, onCustomerAdded, user }) => {
  const { handleSubmit, reset, control, setValue } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchemasCustomer),
    defaultValues: DEFAULT_VALUES_CUSTOMER,
  });
  console.log(user?.id);

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

  useEffect(() => {
    setValue("user_id", user?.id);
  }, [user, setValue]);

  const onSubmit = (data) => {
    addCustomerMutation.mutate(data);
  };
  // Reset campos del formulario al cerrar el modal
  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <ModalLayout title="Registrar Cliente" open={open} onClose={handleClose}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} my={1} noValidate>
        <Grid container spacing={2}>
          <CustomerFormFields control={control} />
          <Grid item xs={12}>
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
