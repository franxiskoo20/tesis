import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../contexts/AuthProvider";
import { TextField, Button, Container, Box, Typography } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  // const navigate = useNavigate();

  // Manejador del evento submit del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    login({ email, password });
    // navigate("/dashboard");
  };

  // Si está cargando, podríamos mostrar un indicador de carga

  // Si el usuario ya está autenticado, redirigir al dashboard
  // if (isAuthenticated) {
  //   return <Navigate to="/dashboard" replace />;
  // }

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
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          {/* {isLoginError && (
            <Typography color="error">
              {loginError.response?.data?.message}
            </Typography>
          )} */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              // autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
