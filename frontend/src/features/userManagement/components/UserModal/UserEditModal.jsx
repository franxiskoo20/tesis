import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userService } from "../../services/userService";
import { Grid, Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalLayout from "../../../../components/layout/ModalLayout";
import { Switch, FormControlLabel } from "@mui/material";
import { userValidationSchemaWithoutPassword } from "../../utils/validationSchemasUtils";
import UserFormFields from "../../components/UserInputs/UserFormFields";
import UserFormPasswordFields from "../../components/UserInputs/UserFormPasswordFields";
import EditIcon from "@mui/icons-material/Edit";

import ActionButtons from "../../../../components/common/buttons/ActionButtons";

/**
 * * Componente para editar usuarios
 * @param open abre el modal
 * @param onClose cierra el modal
 * @param userToEdit usuario a editar
 * @param onUserUpdated actualiza la lista de usuarios de la tabla
 */

const UserEditModal = ({ open, onClose, userToEdit, onUserUpdated }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userValidationSchemaWithoutPassword),
    defaultValues: {
      role_id: "",
    },
  });

  // cargar datos del usuario a editar
  useEffect(() => {
    if (userToEdit) {
      console.log("userToEdit: " + userToEdit.name);
      reset({
        name: userToEdit.name,
        email: userToEdit.email,
        role_id: userToEdit.roleId,
      });
    }
  }, [userToEdit, reset]);

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: userService.getRoles,
  });

  // switch para mostrar/ocultar campos de contraseña
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const switchLabel = showPasswordFields
    ? "Ocultar Cambio de Contraseña"
    : "Cambiar Contraseña";

  // enviar datos del formulario para editar usuario
  const updateMutation = useMutation({
    mutationFn: (data) => userService.updateUser(userToEdit.id, data),
    onSuccess: () => {
      console.log("se envio el formulario");
      if (onUserUpdated) {
        onUserUpdated();
        onClose();
      }
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (data) => userService.updateUserPassword(userToEdit.id, data),
    onSuccess: () => {
      console.log("se envio el formulario password");

      if (onUserUpdated) onUserUpdated();
      onClose();
    },
  });

  const hasUserChanged = (data) => {
    const roleChanged = parseInt(data.role_id) !== userToEdit.roleId;
    console.log("roleChanged status: " + roleChanged);
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
    <ModalLayout title="Registrar Usuario" open={open} onClose={onClose}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} my={1} noValidate>
        <Grid container spacing={2}>
          <UserFormFields
            register={register}
            errors={errors}
            control={control}
            roles={roles}
          />
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
          <UserFormPasswordFields
            register={register}
            errors={errors}
            showPasswordFields={showPasswordFields}
          />

          <Grid item xs={12}>
            <ActionButtons
              // isLoading={registerMutation.isLoading}
              onCancel={onClose}
              acceptButtonLabel="Registrar"
              acceptButtonIcon={<EditIcon />}
            />
          </Grid>
        </Grid>
      </Box>
    </ModalLayout>
  );
};

export default UserEditModal;
