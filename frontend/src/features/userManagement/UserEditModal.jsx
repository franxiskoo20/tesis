import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { adminService } from "../../services/adminService";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
} from "@mui/material";

const UserEditModal = ({ open, onClose, userToEdit, onUserUpdated }) => {
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: adminService.getRoles,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => adminService.updateUser(userToEdit.id, data),
    onSuccess: () => {
      if (onUserUpdated) onUserUpdated();
      onClose();
    },
  });

  useEffect(() => {
    if (userToEdit) {
      setValue("name", userToEdit.name);
      setValue("email", userToEdit.email);
    }
  }, [userToEdit, setValue]);

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };

  const handleTogglePasswordFields = (event) => {
    setShowPasswordFields(event.target.checked);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Usuario</DialogTitle>
      <DialogContent>
        <Box component="form" my={1} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register("name", { required: true })}
                label="Name"
                variant="outlined"
                type="text"
                fullWidth
                error={!!errors.name}
                helperText={errors.name ? "Este campo es requerido" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("email", { required: true })}
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email ? "Este campo es requerido" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="role-select-label">Rol</InputLabel>
                <Select
                  {...register("role_id", { required: true })}
                  labelId="role-select-label"
                  id="role-select"
                  label="Rol"
                  defaultValue={userToEdit.roleId}
                  error={!!errors.role_id}
                >
                  {roles?.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.role_type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Switch para mostrar/ocultar campos de contraseña */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={showPasswordFields}
                    onChange={handleTogglePasswordFields}
                  />
                }
                label={
                  showPasswordFields
                    ? "Ocultar Cambio de Contraseña"
                    : "Cambiar Contraseña"
                }
              />
            </Grid>

            {/* Campos de contraseña que se muestran condicionalmente */}
            {showPasswordFields && (
              <>
                <Grid item xs={12}>
                  <TextField
                    {...register("password", { required: true })}
                    label="Nueva Contraseña"
                    variant="outlined"
                    type="password"
                    fullWidth
                    error={!!errors.password}
                    helperText={
                      errors.password ? "Este campo es requerido" : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register("confirmPassword", { required: true })}
                    label="Confirmar Nueva Contraseña"
                    variant="outlined"
                    type="password"
                    fullWidth
                    error={!!errors.confirmPassword}
                    helperText={
                      errors.confirmPassword ? "Este campo es requerido" : ""
                    }
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={updateMutation.isLoading}
              >
                Actualizar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditModal;
