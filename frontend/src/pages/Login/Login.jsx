import { useState } from "react";
import DefaultLayout from "../../components/layout/DefaultLayout";
import useAuth from "../../features/auth/useAuth";
import { TextField, Button, Container, Box, Typography } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(""); // Resetear el estado de error antes de cada intento de login
    login(
      { email, password },
      {
        onSuccess: () => {
          setIsLoading(false);
        },
        onError: (error) => {
          // Aquí manejas el error de login
          setError(
            error.response?.data?.message || "Ocurrió un error durante el login"
          );
          setIsLoading(false);
        },
      }
    );
  };
  // Si está cargando, podríamos mostrar un indicador de carga

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
            Acceder {isLoading && "esta cargando el login...."}
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box
            component="form"
            onSubmit={handleLogin}
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
              autoComplete="current-password"
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
