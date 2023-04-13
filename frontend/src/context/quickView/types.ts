import { Dispatch } from "constants/types";
import { QuickViewMode } from "components/shared/QuickView";

// States
export type QuickViewState = {
  mode?: QuickViewMode;
  isOpen?: boolean;
};

// Action types
export enum QuickViewActionTypes {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
}

// Dispatch
export type QuickViewOpenDispatch = Dispatch<
  QuickViewActionTypes.OPEN,
  QuickViewState["mode"]
>;

export type QuickViewCloseDispatch = Dispatch<QuickViewActionTypes.CLOSE>;

// Action
export type QuickViewAction = QuickViewOpenDispatch | QuickViewCloseDispatch;
