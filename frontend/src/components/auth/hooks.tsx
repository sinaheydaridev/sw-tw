import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
// utils
import { date } from "utils/app";
// hooks
import { useMultiStep } from "hooks/custom";
// services
import services from "services";
import { ISignup, SignUpResult } from "services/user";
// schema
import { loginSchema, signUpSchema } from "schema/user";
// constants
import { HOME_ROUTE, LOGIN_ROUTE } from "constants/routes";

export const useSignUpData = () => {
  const [days, setDays] = useState<number[]>(
    date.getDays(moment().year(), moment().format("MMMM"))
  );
  const {
    step,
    status: stepStatus,
    onNextStep,
    onPrevStep,
  } = useMultiStep({ max: 3, strictPrev: 3 });
  const [loading, setLoading] = useState<boolean>(false);
  const [serverErrors, setServerErrors] = useState<SignUpResult>({
    confirmation_code: "",
    email: "",
    is_verify: false,
    username: "",
  });
  const [avatarUri, setAvatarUri] = useState<string>("");
  const navigate = useNavigate();
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldError,
    setErrors,
  } = useFormik<ISignup>({
    initialErrors: { email: "" },
    initialValues: {
      email: "",
      phone: "",
      username: "",
      fullName: "",
      password: "",
      date_of_birth: {
        day: moment().day(),
        month: parseInt(moment().format("M")),
        year: moment().year(),
      },
      confirmationCode: "",
      avatar: "",
    },
    validationSchema:
      (step === 1 && signUpSchema.stepOne) ||
      (step === 2 && signUpSchema.stepTwo),
    onSubmit: async () => {
      setLoading(true);
      (step === 1 || step === 2) && (await signUpMutateAsync());
      step === 3 && (await changeAvatarMutateAsync());
    },
  });

  // Services ======================================

  const handleSendVerificationCode = async () => {
    return await services.user.sendVerificationCode(values.email!);
  };

  const handleSignUp = async () => {
    return await services.user.signup(values);
  };

  const handleChangeAvatar = async () => {
    console.log(values.avatar);

    return await services.user.changeAvatar(values.avatar!);
  };

  const handleSetCsrfToken = async () => {
    return await services.user.setCsrfToken();
  };

  // Queries ======================================

  const { mutateAsync: sendVerificationCodeMutateAsync } = useMutation(
    handleSendVerificationCode,
    {
      onSuccess: () => {
        toast("We send verification code, please check your email");
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
    }
  );

  const { mutateAsync: signUpMutateAsync } = useMutation<
    SignUpResult,
    { errorData: SignUpResult }
  >(handleSignUp, {
    onSuccess: async (data) => {
      if (step === 1) {
        await sendVerificationCodeMutateAsync();
        setFieldError("confirmationCode", "");
        onNextStep();
      } else if (step === 2 && data.is_verify) {
        // success confirmation code (user registered!!!)
        onNextStep();
      } else {
        // fail confirmation code
        setServerErrors({...serverErrors,...data});
      }
      setLoading(false);
    },
    onError: (error) => {
      console.log(error.errorData);

      setLoading(false);
      setServerErrors({ ...serverErrors, ...error.errorData });
    },
  });

  const { mutateAsync: changeAvatarMutateAsync } = useMutation(
    handleChangeAvatar,
    {
      onSuccess: () => {
        setLoading(false);
        navigate(HOME_ROUTE);
      },
      onError: () => {
        setLoading(false);
      },
    }
  );

  const { mutateAsync: setCsrfTokenMutateAsync } =
    useMutation(handleSetCsrfToken);

  // Events ======================================

  useEffect(() => {
    const dateOfBirth = values.date_of_birth;
    setDays(date.getDays(dateOfBirth?.year, dateOfBirth?.month!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    values.date_of_birth?.day,
    values.date_of_birth?.month,
    values.date_of_birth?.year,
  ]);

  useEffect(() => {
    if (stepStatus === "prev") {
      setErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, errors]);

  const setCsrfToken = async () => {
    await setCsrfTokenMutateAsync();
  };

  useEffect(() => {
    setCsrfToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    days,
    step,
    loading,
    values,
    touched,
    isValid: Object.keys(errors).length === 0,
    errors,
    serverErrors,
    avatarUri,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    onPrevStep,
    setServerErrors,
    setAvatarUri,
  };
};

export const useInitGoogleClient = () => {
  const googleRef = useRef(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignUp = async (t: string) =>
    await services.user.googleSignUp(t);

  const handleGoogleLogin = async (t: string) =>
    await services.user.googleLogin(t);

  const { mutateAsync: googleAuthMutateAsync } = useMutation(
    pathname === LOGIN_ROUTE ? handleGoogleLogin : handleGoogleSignUp,
    {
      onSuccess: () => {
        navigate(HOME_ROUTE, { replace: true });
      },
      onError: (error: { errorData: { email: string } }) => {
        if (error.errorData.email) {
          toast("User with this email already exists.", {
            type: "error",
            progressClassName: "danger",
          });
        }
      },
    }
  );

  const initializeGsi = () => {
    const wind: any = window;
    if (!wind.google) return;
    if (googleRef.current) {
      wind.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: async (res: any, error: any) => {
          await googleAuthMutateAsync(res.credential);
        },
      });
      // wind.google.accounts.id.prompt();
      wind.google.accounts.id.renderButton(googleRef.current, {
        type: "pill",
        class: "g_id_signin pill",
        shape: "pill",
        size: "large",
        text: "signup_with",
      });
    }
  };

  useEffect(() => {
    initializeGsi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleRef.current, window]);

  return { googleRef };
};

export const useLoginData = () => {
  const [serverErrors, setServerErrors] = useState({ detail: "" });
  const navigate = useNavigate();
  const {
    values,
    touched,
    errors,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik<{ email: string; password: string }>({
    isInitialValid: false,
    initialErrors: { email: "", password: "" },
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async () => {
      await loginSubmit();
    },
  });

  const handleLogin = async () => {
    return await services.user.login(values);
  };

  const { isLoading, mutateAsync: loginMutateAsync } = useMutation<
    any,
    { errorData: { detail: string } }
  >(handleLogin, {
    onSuccess: () => {
      navigate(HOME_ROUTE, { replace: true });
    },
    onError: (error) => {
      setServerErrors({ ...error.errorData });
    },
  });

  const loginSubmit = async () => {
    await loginMutateAsync();
  };

  return {
    loading: isLoading,
    values,
    touched,
    isValid: isValid,
    errors,
    serverErrors,
    handleChange,
    handleBlur,
    handleSubmit,
    setServerErrors,
  };
};
