import { useEffect } from "react";
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
} from "@mui/material";

const UserEditModal = ({ open, onClose, userToEdit, onUserUpdated }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: adminService.getRoles,
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
      setValue("role_id", userToEdit.role_id);
      // No establecer la contraseña aquí
    }
  }, [userToEdit, setValue]);

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Usuario</DialogTitle>
      <DialogContent>
        <Box component="form" my={1} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Campos del formulario */}
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
            {/* No incluir campos de contraseña a menos que también quieras permitir cambiar la contraseña aquí */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="role-select-label">Rol</InputLabel>
                <Select
                  {...register("role_id", { required: true })}
                  labelId="role-select-label"
                  id="role-select"
                  label="Rol"
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
