import User from "models/user";
import { UserAction, UserActionTypes, UserState } from "./types";

export const initialState: any = {
  user: new User(),
  isLoggedIn: false,
};

const reducer: React.Reducer<UserState, UserAction> = (state=initialState, action) => {
  switch (action.type) {
    case UserActionTypes.LOAD_USER_DATA:
      return { ...state, ...action.payload, isLoggedIn: true };
    case UserActionTypes.CLEAR_USER_DATA:
      return { user: new User(), isLoggedIn: false };
    default:
      return state;
  }
};

export default reducer;
