import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./assets/fontStyle.js";

import { AuthProvider } from "./contexts/AuthProvider.jsx";
import Products from "./pages/Products.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import PublicRoute from "./routes/PublicRoutes.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// import Loading from "./components/Loading.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      { index: true, element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "products", element: <Products /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
  { path: "*", element: <ErrorPage /> },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
