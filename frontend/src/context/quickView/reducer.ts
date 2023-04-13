import { QuickViewMode } from "components/shared/QuickView";
import { QuickViewAction, QuickViewActionTypes, QuickViewState } from "./types";

export const initialState: QuickViewState = {
  isOpen: false,
  mode: QuickViewMode.default,
};

const reducer: React.Reducer<QuickViewState, QuickViewAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case QuickViewActionTypes.OPEN:
      return { isOpen:true, mode:action.payload };
    case QuickViewActionTypes.CLOSE:
      return { isOpen: false };
    default:
      return state;
  }
};

export default reducer;
