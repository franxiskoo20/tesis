import { useState, useEffect } from "react";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { adminService } from "../services/adminService";

import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  // CircularProgress,
  Snackbar,
  Grid,
} from "@mui/material";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const {
    mutate: register,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: adminService.register,
    onSuccess: (data) => {
      // login({ email, password });
      console.log({ email, password });
    },
    onError: (error) => {},
  });

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: () => adminService.getRoles(localStorage.getItem("token")),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    register(
      { name, email, password, role_type: role },
      localStorage.getItem("token")
    );
  };

  if (isLoading) {
    return <div>Loading...Sigup</div>;
  }

  return (
    <AuthenticatedLayout>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>Registrar</h1>
            {isError && <Snackbar open={true} message={error?.message} />}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="role-select-label">Rol</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {roles?.map((r) => (
                  <MenuItem key={r.role_type} value={r.role_type}>
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
              disabled={isLoading}
            >
              Create Account
            </Button>
          </Grid>
        </Grid>
      </form>
    </AuthenticatedLayout>
  );
};

export default Register;
