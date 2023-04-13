// context
import createContextData from "context/createContextData";
import { setAppConfig } from "./actions";
// locale
import reducer, { initialState } from "./reducer";
import { AppConfigState } from "./types";

export interface IAppConfigContext extends AppConfigState {
  setConfig: (config: AppConfigState) => void;
}
export const { Provider: AppConfigProvider, Context: AppConfigContext } =
  createContextData<IAppConfigContext>(reducer, initialState, {
    setConfig: setAppConfig,
  });
