import { Navigate, Outlet } from "react-router-dom";
import { useProtectedData } from "../routeMode/hooks";
import { LOGIN_ROUTE } from "constants/routes";
import AppLoading from "components/shared/AppLoading";

const ProtectedRoute = () => {
  const { isLoading, isLoggedIn } = useProtectedData();

  if (isLoading) {
    return <AppLoading />;
  }

  if (!isLoggedIn && !isLoading) {
    return <Navigate to={LOGIN_ROUTE} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
