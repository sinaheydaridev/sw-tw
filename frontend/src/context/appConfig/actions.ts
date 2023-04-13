import {
  AppConfigActionTypes,
  AppConfigDispatch,
  AppConfigState,
} from "./types";

export const setAppConfig =
  (dispatch: React.Dispatch<AppConfigDispatch>) => (config: AppConfigState) => {
    dispatch({
      type: AppConfigActionTypes.SET,
      payload: config,
    });
  };
