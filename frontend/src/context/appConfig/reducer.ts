import { PageActiveEnum } from "constants/enums";
import { AppConfigAction, AppConfigActionTypes, AppConfigState } from "./types";

export const initialState: AppConfigState = {
  headerTitle: "",
  headerSubTitle: "",
  headerComponent: null,
  isBack: false,
  to: "",
  pageActive: PageActiveEnum.home,
};

const reducer: React.Reducer<AppConfigState, AppConfigAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AppConfigActionTypes.SET:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
