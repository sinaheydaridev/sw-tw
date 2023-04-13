import { PageActiveEnum } from "constants/enums";
import { Dispatch } from "constants/types";

// States
export type AppConfigState = {
  isBack: boolean;
  to: string;
  headerTitle?: string;
  headerSubTitle?: string;
  headerComponent?: React.ReactNode;
  pageActive: PageActiveEnum;
};

// Action types
export enum AppConfigActionTypes {
  SET = "SET",
}

// Dispatch
export type AppConfigDispatch = Dispatch<
  AppConfigActionTypes.SET,
  AppConfigState
>;

// Action
export type AppConfigAction = AppConfigDispatch;
