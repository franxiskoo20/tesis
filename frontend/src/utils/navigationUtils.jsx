import { Link } from "react-router-dom";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ROLES } from "../constants/roles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const navigationByRole = {
  [ROLES.ADMINISTRADOR]: [
    { name: "Dashboard", path: "/app/dashboard", icon: <DashboardIcon /> },
    { name: "Usuarios", path: "/app/users", icon: <PeopleIcon /> },
    {
      name: "Productos",
      path: "/app/products",
      icon: <ProductionQuantityLimitsIcon />,
    },
    { name: "Servicios", path: "/app/services", icon: <PostAddIcon /> },
    { name: "Clientes", path: "/app/customers", icon: <SupportAgentIcon /> },
  ],
  [ROLES.JEFE_COMERCIAL]: [
    { name: "Dashboard", path: "/app/dashboard", icon: <DashboardIcon /> },
    { name: "Usuarios", path: "/app/users", icon: <PeopleIcon /> },
    {
      name: "Productos",
      path: "/app/products",
      icon: <ProductionQuantityLimitsIcon />,
    },
    { name: "Servicios", path: "/app/services", icon: <PostAddIcon /> },
    { name: "Clientes", path: "/app/customers", icon: <SupportAgentIcon /> },
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
