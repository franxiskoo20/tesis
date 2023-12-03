import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { userService } from "../../services/userService";
import { Grid, Box } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalLayout from "../../../../components/layout/ModalLayout";
import { Switch, FormControlLabel } from "@mui/material";
import { userValidationSchemaWithoutPassword } from "../../utils/validationSchemasUtils";
import UserFormFields from "../../components/UserInputs/UserFormFields";
import UserFormPasswordFields from "../../components/UserInputs/UserFormPasswordFields";
import EditIcon from "@mui/icons-material/Edit";
import useRoles from "../../hooks/useRoles";
import ActionButtons from "../../../../components/common/Buttons/ActionButtons";

/**
 * * Componente para editar usuarios
 * @param open abre el modal
 * @param onClose cierra el modal
 * @param userToEdit usuario a editar
 * @param onUserUpdated actualiza la lista de usuarios de la tabla
 */

const DEFAULT_VALUES_EDIT = {
  name: "",
  email: "",
  role_id: "",
  changePassword: false,
  password: "",
  password_confirmation: "",
};

const UserEditModal = ({
  open,
  onClose,
  userToEdit,
  onUserUpdated,
  showSnackbar,
}) => {
  // formulario react-hook-form
  const { handleSubmit, reset, control, setValue } = useForm({
    resolver: yupResolver(userValidationSchemaWithoutPassword),
    mode: "onChange",
    defaultValues: DEFAULT_VALUES_EDIT,
  });

  // switch para mostrar/ocultar campos de contraseña
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const switchLabel = showPasswordFields
    ? "Ocultar Cambio de Contraseña"
    : "Cambiar Contraseña";

  // cargar datos del usuario a editar
  useEffect(() => {
    if (userToEdit) {
      reset({
        name: userToEdit.name,
        email: userToEdit.email,
        role_id: userToEdit.roleId,
        changePassword: false,
        password: "",
        password_confirmation: "",
      });
    }
  }, [userToEdit, reset]);

  // obtener roles
  const { roles } = useRoles();

  // enviar datos del formulario para editar usuario
  const updateMutation = useMutation({
    mutationFn: (data) => userService.updateUser(userToEdit.id, data),
    onError: (error) => {
      showSnackbar(
        error?.errors || "Error en actulización de usuario",
        "error"
      );
    },
    onSuccess: (data) => {
      showSnackbar(data?.message || "Usuario actualizado con éxito", "success");
      onUserUpdated?.();
      onClose?.();
    },
  });

  // enviar datos del formulario para editar contraseña
  const updatePasswordMutation = useMutation({
    mutationFn: (data) => userService.updateUserPassword(userToEdit.id, data),
    onError: (error) => {
      showSnackbar(
        error?.errors || "Error en actulización de contraseña",
        "error"
      );
    },
    onSuccess: () => {
      showSnackbar("Contraseña actualizada con éxito", "success");
      onUserUpdated?.();
      onClose?.();
    },
  });

  // verificar si el usuario ha cambiado
  const hasUserChanged = (data) => {
    const roleChanged = parseInt(data.role_id) !== userToEdit.roleId;
    return (
      data.name !== userToEdit.name ||
      data.email !== userToEdit.email ||
      roleChanged
    );
  };

  // enviar datos del formulario para editar usuario
  const onSubmit = (data) => {
    const { password, password_confirmation, changePassword, ...userData } =
      data;
    const passwordChanged = changePassword && password && password_confirmation;

    const userChanged = hasUserChanged(userData);

    if (passwordChanged) {
      updatePasswordMutation.mutate({
        new_password: data.password,
        new_password_confirmation: data.password_confirmation,
      });
    }

    if (userChanged) {
      updateMutation.mutate(userData);
    }

    if (!passwordChanged && !userChanged) {
      showSnackbar("No se han detectado cambios", "info");
      onClose?.();
    }
  };

  // switch para mostrar/ocultar campos de contraseña
  const handleTogglePasswordFields = (event) => {
    setValue("changePassword", event.target.checked);
    setShowPasswordFields(event.target.checked);
  };

  // la mutación está pendiente de ejecución
  const isUpdating =
    updateMutation.isPending || updatePasswordMutation.isPending;

  return (
    <ModalLayout title="Registrar Usuario" open={open} onClose={onClose}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} my={1} noValidate>
        <Grid container spacing={2}>
          <UserFormFields control={control} roles={roles} />
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
          {showPasswordFields && <UserFormPasswordFields control={control} />}
          <Grid item xs={12}>
            <ActionButtons
              onCancel={onClose}
              acceptButtonLabel="Editar"
              acceptButtonIcon={<EditIcon />}
              isPending={isUpdating}
            />
          </Grid>
        </Grid>
      </Box>
    </ModalLayout>
  );
};

export default UserEditModal;
