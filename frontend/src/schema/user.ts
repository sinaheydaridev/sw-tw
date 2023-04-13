import { object, string } from "yup";

const phoneRegExp = /^\+?1?\d{9,13}$/;

export const signUpSchema = {
  stepOne: object({
    fullName: string().required(),
    email: string().email("Email invalid.").required(),
    phone: string().matches(phoneRegExp, "Phone invalid.").required(),
    username: string().required(),
    password: string().min(10).max(250).required(),
  }),
  stepTwo: object({
    confirmationCode: string().min(6).max(6).required(),
  }),
};

export const loginSchema = object({
  email: string().email("Email invalid.").required(),
  password: string().min(10).max(250).required(),
});
