import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./features/auth/AuthProvider";

import { createBrowserRouter } from "react-router-dom";

import {
  ProtectedRoutes,
  PublicRoutes,
  ErrorPage,
  RoleProtectedElement,
} from "./routes";

import { Products, Login, Dashboard, UserManagement } from "./pages";

import { ROLES } from "./constants/roles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoutes />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: "/app",
    element: <ProtectedRoutes />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "products",
        element: (
          <RoleProtectedElement
            allowedRoles={[ROLES.ADMINISTRADOR, ROLES.JEFE_COMERCIAL]}
          >
            <Products />
          </RoleProtectedElement>
        ),
      },
      {
        path: "users",
        element: (
          <RoleProtectedElement allowedRoles={ROLES.ADMINISTRADOR}>
            <UserManagement />
          </RoleProtectedElement>
        ),
      },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
