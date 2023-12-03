import { useMutation } from "@tanstack/react-query";
import { userService } from "../../services/userService";

import { Grid, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalLayout from "../../../../components/layout/ModalLayout";
import ActionButtons from "../../../../components/common/buttons/ActionButtons";
import { userValidationSchemaWithPassword } from "../../utils/validationSchemasUtils";
import UserFormFields from "../../components/UserInputs/UserFormFields";
import UserFormPasswordFields from "../../components/UserInputs/UserFormPasswordFields";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { DevTool } from "@hookform/devtools";
import useRoles from "../../hooks/useRoles";

const DEFAULT_VALUES = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  role_id: "",
};

const UserRegistrationModal = ({
  open,
  onClose,
  onUserAdded,
  showSnackbar,
}) => {
  const { handleSubmit, reset, control } = useForm({
    mode: "onChange",
    resolver: yupResolver(userValidationSchemaWithPassword),
    defaultValues: DEFAULT_VALUES,
  });

  const { roles } = useRoles();

  const registerMutation = useMutation({
    mutationFn: userService.register,
    onError: (error) => {
      showSnackbar(error?.errors || "Error en el registro de usuario", "error");
    },
    onSuccess: (data) => {
      showSnackbar(data?.message || "Usuario registrado con éxito", "success");
      onUserAdded?.();
      handleClose?.();
    },
  });

  const onSubmit = (data) => {
    console.log("Datos enviados: " + data.name + " " + data.email);
    registerMutation.mutate(data);
  };

  // Reset campos del formulario al cerrar el modal
  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <ModalLayout title="Registrar Usuario" open={open} onClose={handleClose}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} my={1} noValidate>
        <Grid container spacing={2}>
          <UserFormFields control={control} roles={roles} />

          <UserFormPasswordFields control={control} />

          <Grid item xs={12}>
            <ActionButtons
              acceptButtonLabel="Registrar"
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

export default UserRegistrationModal;