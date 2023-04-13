import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import services from "services";
// context
import { useUser } from "context/hooks";
import { LOGIN_ROUTE } from "constants/routes";
import User from "models/user";

export const useProtectedData = () => {
  const navigate = useNavigate();
  const { loadUserData, user, isLoggedIn } = useUser();

  const handleGetUser = async () => await services.user.getUser();

  const { isLoading } = useQuery("get-user", handleGetUser, {
    onSuccess: ({ data }) => {
      loadUserData(new User(data.user));
    },
    onError: (error) => {
      navigate(LOGIN_ROUTE, { replace: true });
    },
    retry: 0,
  });

  console.log('setting route render', isLoading);
  
  return { isLoading, user, isLoggedIn };
};
