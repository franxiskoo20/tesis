import NavigationBar from "../common/NavigationBar";
import { Button, Container, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import useAuth from "../../features/auth/useAuth";
import { Link } from "react-router-dom";

import { ROLES } from "../../constants/roles";

export default function AuthenticatedLayout({ children }) {
  const { user, logout } = useAuth();

  const navigationByRole = {
    [ROLES.ADMINISTRADOR]: [
      { name: "Dashboard", path: "/app/dashboard", icon: <DashboardIcon /> },
      { name: "Usuarios", path: "/app/users", icon: <PeopleIcon /> },
    ],
    [ROLES.JEFE_COMERCIAL]: [
      { name: "Dashboard", path: "/app/dashboard", icon: <DashboardIcon /> },
      { name: "Products", path: "/app/products", icon: <ShoppingCartIcon /> },
    ],
    [ROLES.CUSTOMER_SERVICE]: [
      { name: "Dashboard", path: "/app/dashboard", icon: <DashboardIcon /> },
      { name: "Products", path: "/app/products", icon: <ShoppingCartIcon /> },
    ],
    [ROLES.ROMANA]: [
      { name: "Dashboard", path: "/app/dashboard", icon: <DashboardIcon /> },
      { name: "Products", path: "/app/products", icon: <ShoppingCartIcon /> },
    ],
    [ROLES.PORTERO]: [
      { name: "Dashboard", path: "/app/dashboard", icon: <DashboardIcon /> },
      { name: "Products", path: "/app/products", icon: <ShoppingCartIcon /> },
    ],
  };

  const handleSignOut = async () => {
    await logout();
  };

  const roleBasedNavigation = (role) => {
    return navigationByRole[role]?.map((item) => (
      <Button
        key={item.name}
        color="inherit"
        component={Link}
        to={item.path}
        startIcon={item.icon}
      >
        {item.name}
      </Button>
    ));
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} mb={3}>
        <NavigationBar
          user={user}
          onSignOut={handleSignOut}
          roleBasedNavigation={roleBasedNavigation}
        />
      </Box>
      <Container>{children}</Container>
    </>
  );
}
