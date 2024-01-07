import { createBrowserRouter } from "react-router-dom";
import { ROLES_USER } from "../features/user/constants/userRoles";
import {
  CustomerPage,
  DashboardPage,
  ErrorPage,
  LoginPage,
  ProductPage,
  ServicePage,
  UserPage,
  RatePage,
  UserProfile,
  OrderPage,
  OrderTrunkPage,
  OrderConfirmPage,
  OrderInputPage,
  OrderOutputPage,
} from "../pages";
import { ProtectedRoutes, PublicRoutes, RoleProtectedElement } from "./";

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
      { path: "app/profile", element: <UserProfile /> },
      {
        path: "app/products",
        element: (
          <RoleProtectedElement
            allowedRoles={[ROLES_USER.ADMINISTRADOR, ROLES_USER.JEFE_COMERCIAL]}
          >
            <ProductPage />
          </RoleProtectedElement>
        ),
      },
      {
        path: "app/users",
        element: (
          <RoleProtectedElement
            allowedRoles={[ROLES_USER.ADMINISTRADOR, ROLES_USER.JEFE_COMERCIAL]}
          >
            <UserPage />
          </RoleProtectedElement>
        ),
      },
      {
        path: "app/customers",
        element: (
          <RoleProtectedElement
            allowedRoles={[ROLES_USER.ADMINISTRADOR, ROLES_USER.JEFE_COMERCIAL]}
          >
            <CustomerPage />
          </RoleProtectedElement>
        ),
      },
      {
        path: "app/services",
        element: (
          <RoleProtectedElement
            allowedRoles={[ROLES_USER.ADMINISTRADOR, ROLES_USER.JEFE_COMERCIAL]}
          >
            <ServicePage />
          </RoleProtectedElement>
        ),
      },
      {
        path: "app/rates",
        element: (
          <RoleProtectedElement
            allowedRoles={[ROLES_USER.ADMINISTRADOR, ROLES_USER.JEFE_COMERCIAL]}
          >
            <RatePage />
          </RoleProtectedElement>
        ),
      },
      {
        path: "app/orders",
        element: (
          <RoleProtectedElement
            allowedRoles={[ROLES_USER.ADMINISTRADOR, ROLES_USER.JEFE_COMERCIAL]}
          >
            <OrderPage />
          </RoleProtectedElement>
        ),
      },
      {
        path: "app/orders",
        element: (
          <RoleProtectedElement
            allowedRoles={[ROLES_USER.ADMINISTRADOR, ROLES_USER.JEFE_COMERCIAL]}
          >
            <OrderPage />
          </RoleProtectedElement>
        ),
      },
      {
        path: "app/orders-trunk",
        element: (
          <RoleProtectedElement
            allowedRoles={[ROLES_USER.ADMINISTRADOR, ROLES_USER.JEFE_COMERCIAL]}
          >
            <OrderTrunkPage />
          </RoleProtectedElement>
        ),
      },
      {
        path: "app/orders-confirm",
        element: (
          <RoleProtectedElement
            allowedRoles={[ROLES_USER.ADMINISTRADOR, ROLES_USER.JEFE_COMERCIAL]}
          >
            <OrderConfirmPage />
          </RoleProtectedElement>
        ),
      },
      {
        path: "app/orders-input",
        element: (
          <RoleProtectedElement
            allowedRoles={[ROLES_USER.ADMINISTRADOR, ROLES_USER.JEFE_COMERCIAL]}
          >
            <OrderInputPage />
          </RoleProtectedElement>
        ),
      },
      {
        path: "app/orders-output",
        element: (
          <RoleProtectedElement
            allowedRoles={[ROLES_USER.ADMINISTRADOR, ROLES_USER.JEFE_COMERCIAL]}
          >
            <OrderOutputPage />
          </RoleProtectedElement>
        ),
      },
    ],
  },
]);

export default router;
