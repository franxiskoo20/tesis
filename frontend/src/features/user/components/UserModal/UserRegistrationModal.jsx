import { useMutation } from "@tanstack/react-query";
import { userService } from "../../services/userService";

import { yupResolver } from "@hookform/resolvers/yup";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useForm } from "react-hook-form";
import ActionButtons from "../../../../components/common/Button/ActionButton";
import ModalLayout from "../../../../components/layout/ModalLayout";
import { useSnackbar } from "../../../../hooks/useSnackbar";
import { USER_SNACKBAR } from "../../constants/userSnackbar";
import useRoles from "../../hooks/useRoles";
import { userValidationSchemaWithPassword } from "../../utils/validationSchemasUser";
import UserFormField from "../UserInput/UserFormField";
import UserFormPasswordField from "../UserInput/UserFormPasswordField";

const DEFAULT_VALUES = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  role_id: "",
};

const UserRegistrationModal = ({ open, onClose, onUserAdded }) => {
  const { handleSubmit, reset, control } = useForm({
    mode: "onChange",
    resolver: yupResolver(userValidationSchemaWithPassword),
    defaultValues: DEFAULT_VALUES,
  });
  const { showSnackbar } = useSnackbar();

  const { roles } = useRoles();

  const registerMutation = useMutation({
    mutationFn: userService.register,
    onError: (error) => {
      const snackbar = USER_SNACKBAR.USER_REGISTER_ERROR;
      showSnackbar(error?.errors || snackbar.message, snackbar.type);
    },
    onSuccess: (data) => {
      const snackbar = USER_SNACKBAR.USER_REGISTER_SUCCESS;
      showSnackbar(data?.message || snackbar.message, snackbar.type);
      onUserAdded?.();
    },
  });

  const onSubmit = (data) => {
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
          <UserFormField control={control} roles={roles} />

          <UserFormPasswordField control={control} />
          <Grid xs={12}>
            <ActionButtons
              acceptButtonLabel="Registrar"
              acceptButtonIcon={<HowToRegIcon />}
              onCancel={handleClose}
              isPending={registerMutation.isPending}
            />
          </Grid>
        </Grid>
      </Box>
    </ModalLayout>
  );
};

export default UserRegistrationModal;
