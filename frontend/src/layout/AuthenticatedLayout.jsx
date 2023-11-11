import {
  Typography,
  Button,
  Container,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";

import useAuth from "../hooks/useAuth";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AuthenticatedLayout({ children }) {
  const { user, logout } = useAuth();

  // const navigate = useNavigate();

  const navigationByRole = {
    Administrador: [
      { name: "Dashboard", path: "/app/dashboard" },
      { name: "Registrar Usuarios", path: "/app/register" },
      { name: "Usuarios", path: "/app/users" },
    ],
    "Jefe Comercial": [
      { name: "Dashboard", path: "/app/dashboard" },
      { name: "Products", path: "/app/products" },
    ],
    // Define la navegación para otros roles aquí...
  };

  console.log(user);

  const handleSignOut = async () => {
    await logout();
  };

  const roleBasedNavigation = (role) => {
    return navigationByRole[role]?.map((item) => (
      <Button key={item.name} color="inherit" component={Link} to={item.path}>
        {item.name}
      </Button>
    ));
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Application
            </Typography>
            {user && roleBasedNavigation(user.role)}
            <Button color="inherit" onClick={handleSignOut}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container>
        <main>{children}</main>
      </Container>
    </>
  );
}
