import NavigationBar from "../common/NavigationBar";
import { Button, Container, Box } from "@mui/material";

import useAuth from "../../features/auth/useAuth";
import { Link } from "react-router-dom";

import { ROLES } from "../../constants/roles";

export default function AuthenticatedLayout({ children }) {
  const { user, logout } = useAuth();

  const navigationByRole = {
    [ROLES.ADMINISTRADOR]: [
      { name: "Dashboard", path: "/app/dashboard" },
      { name: "Usuarios", path: "/app/users" },
    ],
    [ROLES.JEFE_COMERCIAL]: [
      { name: "Dashboard", path: "/app/dashboard" },
      { name: "Products", path: "/app/products" },
    ],
    [ROLES.CUSTOMER_SERVICE]: [
      { name: "Dashboard", path: "/app/dashboard" },
      { name: "Products", path: "/app/products" },
    ],
    [ROLES.ROMANA]: [
      { name: "Dashboard", path: "/app/dashboard" },
      { name: "Products", path: "/app/products" },
    ],
    [ROLES.PORTERO]: [
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
