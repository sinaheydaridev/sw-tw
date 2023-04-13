import { useContext } from "react";
import { AppConfigContext } from "./appConfig";

// locale
import { QuickViewContext } from "./quickView";
import { UserContext } from "./user";

const useUser = () => useContext(UserContext);

const useQuickView = () => useContext(QuickViewContext);

const useAppConfig = () => useContext(AppConfigContext);

export { useUser, useQuickView, useAppConfig };
