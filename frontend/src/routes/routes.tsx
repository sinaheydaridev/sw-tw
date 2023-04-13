import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { HOME_ROUTE, LOGIN_ROUTE, SIGNUP_ROUTE } from "constants/routes";
import PublicRoute from "routes/routeMode/public";
import ProtectedRoute from "routes/routeMode/protected";
import { Layout } from "components/layouts";

const Login = lazy(() => import("views/auth/login"));
const SignUp = lazy(() => import("views/auth/signUp"));
const Home = lazy(() => import("views/app/home"));

const Routes = () =>
  useRoutes([
    {
      element: <Navigate to={HOME_ROUTE} replace />,
      path: "",
    },
    {
      element: <PublicRoute />,
      path: "/auth",
      children: [
        {
          element: <Login />,
          path: LOGIN_ROUTE,
        },
        {
          element: <SignUp />,
          path: SIGNUP_ROUTE,
        },
      ],
    },
    {
      element: <ProtectedRoute />,
      path: "/",
      children: [
        {
          element: <Layout />,
          path: "/",
          children: [
            {
              element: <Home />,
              path: HOME_ROUTE,
            },
          ],
        },
      ],
    },
  ]);

export default Routes;
