import User from "models/user";
import {
  clearUserDataDispatch,
  LoadUserDataDispatch,
  UserActionTypes,
} from "./types";

export const loadUserData =
  (dispatch: React.Dispatch<LoadUserDataDispatch>) => (payload: User) => {
    const user = payload;
    dispatch({
      type: UserActionTypes.LOAD_USER_DATA,
      payload: { user },
    });
  };

export const clearUserData =
  (dispatch: React.Dispatch<clearUserDataDispatch>) => () => {
    dispatch({
      type: UserActionTypes.CLEAR_USER_DATA,
    });
  };
