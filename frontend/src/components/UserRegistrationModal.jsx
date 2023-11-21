import { useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { adminService } from "../services/adminService";

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

const UserRegistrationModal = ({ open, onClose, onUserAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role_id, setRole] = useState("");

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

  const handleSubmit = (event) => {
    event.preventDefault();
    registerMutation.mutate({ name, email, password, role_id });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Registrar Usuario</DialogTitle>
      <DialogContent>
        <Box component="form" my={1} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                type="text"
                fullWidth
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="role-select-label">Rol</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  value={role_id}
                  label="Rol"
                  onChange={(e) => setRole(e.target.value)}
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
