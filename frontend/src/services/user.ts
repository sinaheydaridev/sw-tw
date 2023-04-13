import { AxiosResponse } from "axios";
// endpoints
import endpoints from "constants/endpoints";
// constants
import { CustomError, DateOfBirth } from "constants/types";
import User from "models/user";
// client api
import clientApi from "./clientApi";

export interface ISignup {
  email?: string;
  phone?: string;
  username?: string;
  fullName?: string;
  password?: string;
  date_of_birth?: DateOfBirth;
  confirmationCode?: string;
  avatar?: string;
}

export type SignUpResult = {
  is_verify: boolean;
  email: string;
  username: string;
  confirmation_code: string;
};

const nameSpace = "account/";

export const signup = async (userData: ISignup) => {
  const response = await fetch(
    process.env.REACT_APP_SERVER_ADDRESS + nameSpace + endpoints.user.signup,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
      method: "POST",
    }
  );
  const data = await response.json();
  if (!response.ok) {
    const error: CustomError<SignUpResult> = new Error("Invalid inputs.");
    error.errorData = data;
    throw error;
  } else {
    if (data.confirmation_code === "Invalid") {
      const error: CustomError<SignUpResult> = new Error("Invalid inputs.");
      console.log(data);

      error.errorData = data;
      throw error;
    }
  }
  return data;
};

export const sendVerificationCode = (email: string): Promise<AxiosResponse> => {
  return clientApi.post(nameSpace + endpoints.user.sendVerificationCode, {
    email,
  });
};

export const changeAvatar = (avatar: string): Promise<AxiosResponse> => {
  return clientApi.put(nameSpace + endpoints.user.updateInfo, avatar, {
    withCredentials: true,
  });
};

export const googleSignUp = async (token: string): Promise<any> => {
  const response = await fetch(
    process.env.REACT_APP_SERVER_ADDRESS +
      nameSpace +
      endpoints.user.googleSignup,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ google_user_token: token }),
      method: "POST",
    }
  );
  const data = await response.json();
  if (!response.ok) {
    const error: CustomError<{ email: string }> = new Error("Invalid inputs.");
    error.errorData = data;
    throw error;
  }
  return data;
};

export const setCsrfToken = () => {
  return fetch(process.env.REACT_APP_SERVER_ADDRESS + "set-csrf-token/", {
    credentials: "include",
  });
};

export const login = async (userData: { email: string; password: string }) => {
  const response = await fetch(
    process.env.REACT_APP_SERVER_ADDRESS + nameSpace + endpoints.user.login,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
      method: "POST",
    }
  );
  const data = await response.json();
  if (!response.ok) {
    const error: CustomError<{ detail: string }> = new Error("Invalid inputs.");
    error.errorData = data;
    throw error;
  }
  return data;
};

export const googleLogin = async (token: string) => {
  const response = await fetch(
    process.env.REACT_APP_SERVER_ADDRESS +
      nameSpace +
      endpoints.user.googleLogin,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ google_user_token: token }),
      method: "POST",
    }
  );
  const data = await response.json();
  return data;
};

export const getUser = (): Promise<AxiosResponse<{user:User}>> => {
  return clientApi.get(nameSpace + endpoints.user.state, {
    withCredentials: true,
  });
};
