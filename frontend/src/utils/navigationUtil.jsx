import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PeopleIcon from "@mui/icons-material/People";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { ROLES_USER } from "../features/user/constants/userRoles";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

const navigationByRole = {
  [ROLES_USER.ADMINISTRADOR]: [
    { name: "Dashboard", path: "/app/dashboard", icon: <DashboardIcon /> },
    { name: "Usuarios", path: "/app/users", icon: <PeopleIcon /> },
    {
      name: "Productos",
      path: "/app/products",
      icon: <ProductionQuantityLimitsIcon />,
    },
    { name: "Servicios", path: "/app/services", icon: <PostAddIcon /> },
    { name: "Clientes", path: "/app/customers", icon: <SupportAgentIcon /> },
    { name: "Tarifas", path: "/app/rates", icon: <ShoppingCartIcon /> },
    { name: "Orden de Servicio", path: "/app/orders", icon: <ListAltIcon /> },
    {
      name: "Registrar Patente",
      path: "/app/orders-truck",
      icon: <LocalShippingIcon />,
    },
    {
      name: "OS Confirmación",
      path: "/app/orders-confirm",
      icon: <ListAltIcon />,
    },
    {
      name: "OS Ingreso",
      path: "/app/orders-input",
      icon: <ArrowCircleRightRoundedIcon />,
    },
    {
      name: "OS Salida",
      path: "/app/orders-output",
      icon: <ArrowCircleLeftRoundedIcon />,
    },
    {
      name: "OS Ingreso Peso",
      path: "/app/orders-weight-input",
      icon: <ArrowCircleDownIcon />,
    },
    {
      name: "OS Salida Peso",
      path: "/app/orders-weight-output",
      icon: <ArrowCircleUpIcon />,
    },
  ],
  [ROLES_USER.JEFE_COMERCIAL]: [
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
  [ROLES_USER.CUSTOMER_SERVICE]: [
    { name: "Dashboard", path: "/app/dashboard", icon: <DashboardIcon /> },
    { name: "Products", path: "/app/products", icon: <ShoppingCartIcon /> },
  ],
  [ROLES_USER.ROMANA]: [
    { name: "Dashboard", path: "/app/dashboard", icon: <DashboardIcon /> },
    { name: "Products", path: "/app/products", icon: <ShoppingCartIcon /> },
  ],
  [ROLES_USER.PORTERO]: [
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
