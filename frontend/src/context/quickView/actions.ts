import { QuickViewMode } from "components/shared/QuickView";
import { enableBodyScroll, disableBodyScroll } from "utils/app";
import {
  QuickViewActionTypes,
  QuickViewCloseDispatch,
  QuickViewOpenDispatch,
  QuickViewState,
} from "./types";

export const onOpen =
  (dispatch: React.Dispatch<QuickViewOpenDispatch>) =>
  ({ mode = QuickViewMode.default }: QuickViewState) => {
    dispatch({
      type: QuickViewActionTypes.OPEN,
      payload: mode,
    });
    disableBodyScroll();
  };

export const onClose =
  (dispatch: React.Dispatch<QuickViewCloseDispatch>) => () => {
    dispatch({
      type: QuickViewActionTypes.CLOSE,
    });
    enableBodyScroll();
  };
