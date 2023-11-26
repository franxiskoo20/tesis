import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./features/auth/AuthProvider";

import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoutes, PublicRoutes, RoleProtectedElement } from "./routes";

import { Products, Login, Dashboard, UserManagement, ErrorPage } from "./pages";

import { ROLES } from "./constants/roles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoutes />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    element: <ProtectedRoutes />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "app/products",
        element: (
          <RoleProtectedElement allowedRoles={ROLES.JEFE_COMERCIAL}>
            <Products />
          </RoleProtectedElement>
        ),
      },
      {
        path: "app/users",
        element: (
          <RoleProtectedElement allowedRoles={ROLES.ADMINISTRADOR}>
            <UserManagement />
          </RoleProtectedElement>
        ),
      },
      { path: "app/dashboard", element: <Dashboard /> },
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
