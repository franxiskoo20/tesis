import { Link } from "react-router-dom";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ROLES } from "../constants/roles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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

export const getRoleNavigationItems = (role) => {
  const items = navigationByRole[role] || [];

  return items.map((item) => (
    <ListItemButton key={item.name} component={Link} to={item.path}>
      <ListItemIcon> {item.icon}</ListItemIcon>
      <ListItemText primary={item.name} />
    </ListItemButton>
  ));
};
