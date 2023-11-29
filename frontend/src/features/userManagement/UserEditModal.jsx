import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { adminService } from "../../services/adminService";
import { Grid, Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalLayout from "../../components/layout/ModalLayout";
import ActionButtons from "../../components/common/ActionButtons";
import { Switch, FormControlLabel } from "@mui/material";
import { userValidationSchema } from "./utils/validationSchemasUtils";
import UserFormFields from "./form/UserFormFields";
import PasswordFields from "./form/PasswordFields";

const UserEditModal = ({ open, onClose, userToEdit, onUserUpdated }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userValidationSchema),
  });

  // switch para mostrar/ocultar campos de contraseña
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const switchLabel = showPasswordFields
    ? "Ocultar Cambio de Contraseña"
    : "Cambiar Contraseña";

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: adminService.getRoles,
  });

  const updateMutation = useMutation({
    mutationFn: (data) => adminService.updateUser(userToEdit.id, data),
    onSuccess: () => {
      console.log("se envio el formulario");
      if (onUserUpdated) onUserUpdated();
      onClose();
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (data) => adminService.updateUserPassword(userToEdit.id, data),
    onSuccess: () => {
      console.log("se envio el formulario pass");

      if (onUserUpdated) onUserUpdated();
      onClose();
    },
  });

  useEffect(() => {
    if (userToEdit) {
      reset({
        name: userToEdit.name,
        email: userToEdit.email,
        role_id: userToEdit.roleId,
      });
    }
  }, [userToEdit, reset]);

  const hasUserChanged = (data) => {
    // Convertir ambos valores a números antes de la comparación
    const roleChanged = parseInt(data.role_id, 10) !== userToEdit.roleId;

    return (
      data.name !== userToEdit.name ||
      data.email !== userToEdit.email ||
      roleChanged
    );
  };

  const onSubmit = (data) => {
    const passwordChanged = data.password && data.password_confirmation;
    const userChanged = hasUserChanged(data);

    if (passwordChanged || userChanged) {
      if (passwordChanged) {
        updatePasswordMutation.mutate({
          new_password: data.password,
          new_password_confirmation: data.password_confirmation,
        });
      }

      if (userChanged) {
        updateMutation.mutate(data);
      }
    } else {
      onClose();
      console.log("No hay cambios para actualizar");
    }
  };

  const handleTogglePasswordFields = (event) => {
    setShowPasswordFields(event.target.checked);
  };

  return (
    <ModalLayout title="Editar Usuario" open={open} onClose={onClose}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} my={1} noValidate>
        <Grid container spacing={2}>
          <UserFormFields
            register={register}
            errors={errors}
            control={control}
            roles={roles}
          />
          {/* Switch para mostrar/ocultar campos de contraseña */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={showPasswordFields}
                  onChange={handleTogglePasswordFields}
                />
              }
              label={switchLabel}
            />
          </Grid>
          <PasswordFields
            register={register}
            errors={errors}
            showPasswordFields={showPasswordFields}
          />

          <Grid item xs={12}>
            <ActionButtons
              isLoading={
                updateMutation.isLoading || updatePasswordMutation.isLoading
              }
              onCancel={onClose}
            />
          </Grid>
        </Grid>
      </Box>
    </ModalLayout>
  );
};

export default UserEditModal;
