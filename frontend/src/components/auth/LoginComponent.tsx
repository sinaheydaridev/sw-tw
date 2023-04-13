// hooks
import { useLoginData } from "./hooks";
// components
import { Button, FlexBox, QuickView, TextField } from "components/shared";
import texts from "constants/texts";
import { TwitterIcon } from "components/icons";

const LoginComponent = () => {
  const {
    loading,
    values,
    touched,
    isValid,
    errors,
    serverErrors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useLoginData();

  const renderHeader = () => {
    return (
      <div className="text-center">
        <TwitterIcon width={40} height={40} />
      </div>
    );
  };

  const renderFooter = () => {
    return (
      <FlexBox justifyContent="center">
        <Button
          className="auth-footer__button"
          type="submit"
          disabled={!isValid}
          spinner={loading}
        >
          {texts.signIn_link}
        </Button>
      </FlexBox>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <QuickView header={renderHeader()} footer={renderFooter()}>
        <div className="auth-form m-auto">
          <h4 className="mb-4">{texts.signIn_now}</h4>
          <TextField
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            errorMessage={errors.email}
            isError={Boolean(touched.email && errors.email)}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            errorMessage={errors.password}
            isError={Boolean(touched.password && errors.password)}
            fullWidth
          />
          {serverErrors && (
            <div className="text-danger fs-6 ms-2">{serverErrors.detail}</div>
          )}
        </div>
      </QuickView>
    </form>
  );
};

export default LoginComponent;
