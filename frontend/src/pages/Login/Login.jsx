import DefaultLayout from "../../components/layout/DefaultLayout";
import useAuth from "../../features/auth/hooks/useAuth";
import { Container, Typography, Avatar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginForm from "../../features/auth/components/LoginForm";

const Login = () => {
  const { login } = useAuth();

  const onSubmit = (data) => {
    login.mutate(data, {
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
      </Container>
    </DefaultLayout>
  );
};

export default Login;
