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

import { DevTool } from "@hookform/devtools";

const DEFAULT_VALUES_CUSTOMER = {
  name: "",
  description: "",
  status: false,
  logo: "",
  user_id: "",
};

const CustomerAddModal = ({ open, onClose, onCustomerAdded, showSnackbar }) => {
  const { handleSubmit, reset, control } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchemasCustomer),
    defaultValues: DEFAULT_VALUES_CUSTOMER,
  });

  const registerMutation = useMutation({
    mutationFn: customerService.addCustomer,
    onError: (error) => {
      showSnackbar(error?.errors || "Error al agregar el cliente", "error");
    },
    onSuccess: (data) => {
      showSnackbar(data?.message || "Cliente agregado con éxito", "success");
      onCustomerAdded?.();
      handleClose?.();
    },
  });

  const onSubmit = (data) => {
    console.log("Datos enviados: " + data.name + " " + data.description);
    registerMutation.mutate(data);
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
              isPending={registerMutation.isPending}
            />
          </Grid>
        </Grid>
      </Box>
      <DevTool control={control} /> {/* set up the dev tool */}
    </ModalLayout>
  );
};

export default CustomerAddModal;
