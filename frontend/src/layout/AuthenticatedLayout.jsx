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
      { name: "Usuarios", path: "/app/users" },
    ],
    "Jefe Comercial": [
      { name: "Dashboard", path: "/app/dashboard" },
      { name: "Products", path: "/app/products" },
    ],
    "Customer Service": [
      { name: "Dashboard", path: "/app/dashboard" },
      { name: "Products", path: "/app/products" },
    ],
    Romana: [
      { name: "Dashboard", path: "/app/dashboard" },
      { name: "Products", path: "/app/products" },
    ],
    Portero: [
      { name: "Dashboard", path: "/app/dashboard" },
      { name: "Products", path: "/app/products" },
    ],
  };

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
      <Box sx={{ flexGrow: 1 }} mb={3}>
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
