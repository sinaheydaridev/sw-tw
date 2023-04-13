// context
import createContextData from "context/createContextData";
// components
import { QuickViewMode } from "components/shared/QuickView";
// locale
import { QuickViewState } from "./types";
import reducer, { initialState } from "./reducer";
import { onOpen, onClose } from "./actions";

export interface IQuickViewContext extends QuickViewState {
  onOpen: (mode: QuickViewMode) => void;
  onClose: () => void;
}

export const { Provider: QuickViewProvider, Context: QuickViewContext } =
  createContextData<IQuickViewContext>(reducer, initialState, {
    onOpen,
    onClose,
  });
