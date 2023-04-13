import User from "models/user";
import { Dispatch } from "constants/types";

// States
export type UserState = {
  user: User;
  isLoggedIn?: boolean;
};

// Action types
export enum UserActionTypes {
  LOAD_USER_DATA = "LOAD_USER_DATA",
  CLEAR_USER_DATA = "CLEAR_USER_DATA",
}

// Dispatch
export type LoadUserDataDispatch = Dispatch<
  UserActionTypes.LOAD_USER_DATA,
  UserState
>;
export type clearUserDataDispatch = Dispatch<UserActionTypes.CLEAR_USER_DATA>;

// Actions
export type UserAction = LoadUserDataDispatch | clearUserDataDispatch;
