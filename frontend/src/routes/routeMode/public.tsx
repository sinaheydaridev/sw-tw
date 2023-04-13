import { Navigate, Outlet } from "react-router-dom";
import { HOME_ROUTE } from "constants/routes";
import { useProtectedData } from "../routeMode/hooks";
import AppLoading from "components/shared/AppLoading";

const PublicRoute = () => {
  const { isLoading, isLoggedIn } = useProtectedData();

  if (isLoading) {
    return <AppLoading />;
  }

  if (isLoggedIn) {
    return <Navigate to={HOME_ROUTE} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
