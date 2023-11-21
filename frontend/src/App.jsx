import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider.jsx";

import { createBrowserRouter } from "react-router-dom";

import {
  ProtectedRoutes,
  PublicRoutes,
  ErrorPage,
  RoleProtectedElement,
} from "./routes";

import { Products, Login, Dashboard, UserManagement } from "./pages";

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
            allowedRoles={["Administrador", "Jefe Comercial"]}
          >
            <Products />
          </RoleProtectedElement>
        ),
      },
      {
        path: "users",
        element: (
          <RoleProtectedElement allowedRoles={"Administrador"}>
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
