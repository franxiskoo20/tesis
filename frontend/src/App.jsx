import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { AuthProvider } from "./features/auth/contexts/AuthProvider";
import { ProtectedRoutes, PublicRoutes, RoleProtectedElement } from "./routes";
import {
  CustomersPage,
  DashboardPage,
  ErrorPage,
  LoginPage,
  ProductsPage,
  ServicesPage,
  UserManagementPage,
} from "./pages";

import { ROLES } from "./constants/roles";
import { DrawerProvider } from "./contexts/DrawerProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoutes />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    element: <ProtectedRoutes />,
    errorElement: <ErrorPage />,
    children: [
      { path: "app/dashboard", element: <DashboardPage /> },
      {
        path: "app/products",
        element: (
          <RoleProtectedElement
            allowedRoles={[ROLES.ADMINISTRADOR, ROLES.JEFE_COMERCIAL]}
          >
            <ProductsPage />
          </RoleProtectedElement>
        ),
      },
      {
        path: "app/users",
        element: (
          <RoleProtectedElement
            allowedRoles={[ROLES.ADMINISTRADOR, ROLES.JEFE_COMERCIAL]}
          >
            <UserManagementPage />
          </RoleProtectedElement>
        ),
      },
      {
        path: "app/customers",
        element: (
          <RoleProtectedElement
            allowedRoles={[ROLES.ADMINISTRADOR, ROLES.JEFE_COMERCIAL]}
          >
            <CustomersPage />
          </RoleProtectedElement>
        ),
      },
      {
        path: "app/services",
        element: (
          <RoleProtectedElement
            allowedRoles={[ROLES.ADMINISTRADOR, ROLES.JEFE_COMERCIAL]}
          >
            <ServicesPage />
          </RoleProtectedElement>
        ),
      },
    ],
  },
]);

// Crear el tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: "#0070ba",
    },
    background: {
      default: "#F5F5F5",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AuthProvider>
        <DrawerProvider>
          <RouterProvider router={router} />
        </DrawerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
