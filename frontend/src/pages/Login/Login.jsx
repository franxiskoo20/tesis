import DefaultLayout from "../../components/layout/DefaultLayout";
import useAuth from "../../features/auth/hooks/useAuth";
import { Container, Typography, Avatar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginForm from "../../features/auth/components/LoginForm";
import CustomSnackbar from "../../components/snackbar/CustomSnackbar";
import useSnackbar from "../../hooks/useSnackbar";

const Login = () => {
  const { login } = useAuth();

  const { open, message, severity, showSnackbar, closeSnackbar } =
    useSnackbar();

  const onSubmit = (data) => {
    login.mutate(data, {
      onError: (error) => {
        showSnackbar(error.message || "Error en el inicio de sesión", "error");
      },
    });
  };
  return (
    <DefaultLayout>
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Acceder
        </Typography>
        <LoginForm onSubmit={onSubmit} isPending={login.isPending} />
        <CustomSnackbar
          open={open}
          setOpen={closeSnackbar}
          message={message}
          severity={severity}
        />
      </Container>
    </DefaultLayout>
  );
};

export default Login;
