import { useForm } from "react-hook-form";
import DefaultLayout from "../../components/layout/DefaultLayout";
import useAuth from "../../features/auth/hooks/useAuth";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();

  const onSubmit = (data) => {
    login(data, {
      onSuccess: () => {
        // Manejar éxito
      },
      onError: (error) => {
        // Manejar error
        console.log(error);
      },
    });
  };

  return (
    <DefaultLayout>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Acceder
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              {...register("email", { required: true })}
              margin="normal"
              required
              fullWidth
              label="Email"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email ? "Este campo es requerido" : ""}
            />
            <TextField
              {...register("password", { required: true })}
              margin="normal"
              required
              fullWidth
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password ? "Este campo es requerido" : ""}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </DefaultLayout>
  );
};

export default Login;
