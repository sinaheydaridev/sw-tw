import { useLayoutEffect } from "react";
// constants
import { PageActiveEnum } from "constants/enums";
// hooks
import { useAppConfig, useUser } from "context/hooks";

const useHomeViewData = () => {
  const { user } = useUser();
  const { setConfig } = useAppConfig();
  useLayoutEffect(() => {
    setConfig({
      headerTitle: "Home",
      isBack: false,
      to: "/back",
      pageActive: PageActiveEnum.home,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user };
};

export default useHomeViewData;
