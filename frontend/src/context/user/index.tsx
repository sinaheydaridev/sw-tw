import createContextData from "context/createContextData";
// models
import User from "models/user";
// locale
import reducer, { initialState } from "./reducer";
import { loadUserData, clearUserData } from "./actions";
import { UserState } from "./types";

export interface IUserContext extends UserState {
  loadUserData: (user: User) => void;
  clearUserData: () => void;
}

export const { Provider: UserProvider, Context: UserContext } =
  createContextData<IUserContext>(reducer, initialState, {
    loadUserData,
    clearUserData,
});
