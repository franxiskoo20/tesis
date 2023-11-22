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
import { useForm } from "react-hook-form";

const UserRegistrationModal = ({ open, onClose, onUserAdded }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  // obtener roles
  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: adminService.getRoles,
  });

  const registerMutation = useMutation({
    mutationFn: adminService.register,
    onSuccess: () => {
      if (onUserAdded) onUserAdded();
      onClose();
    },
  });

  const onSubmit = (data) => {
    registerMutation.mutate(data);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Registrar Usuario</DialogTitle>
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
              <TextField
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 4,
                    message: "La contraseña debe tener al menos 4 caracteres",
                  },
                })}
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("passwordConfirm", {
                  validate: (value) =>
                    value === password || "Las contraseñas no coinciden",
                })}
                label="Confirmar Password"
                variant="outlined"
                type="password"
                fullWidth
                error={!!errors.passwordConfirm}
                helperText={
                  errors.passwordConfirm ? errors.passwordConfirm.message : ""
                }
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
                  error={!!errors.role_id}
                >
                  {roles?.map((r) => (
                    <MenuItem key={r.role_type} value={r.id}>
                      {r.role_type}
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
                disabled={registerMutation.isLoading}
              >
                Registrar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserRegistrationModal;
