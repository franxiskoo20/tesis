import "./assets/fontStyle.js";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider.jsx";

import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoutes, PublicRoutes, ErrorPage } from "./routes";

import { Products, Register, Login, Dashboard } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoutes />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Login /> },
      // { path: "signup", element: <Signup /> },
    ],
  },
  {
    path: "/app",
    element: <ProtectedRoutes />,
    errorElement: <ErrorPage />,
    children: [
      { path: "products", element: <Products /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "register", element: <Register /> },
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
