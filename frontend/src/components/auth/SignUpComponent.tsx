import { toast } from "react-toastify";
import moment from "moment";
// hooks
import { useSignUpData } from "./hooks";
// components
import {
  Avatar,
  Button,
  FlexBox,
  QuickView,
  Select,
  TextField,
} from "components/shared";
import { TwitterIcon } from "components/icons";
// constants
import texts from "constants/texts";
import { ChangeInputEvent, ChangeSelectEvent } from "constants/types";
// utils
import { date } from "utils/app";

const SignUpComponent = () => {
  const {
    days,
    step,
    loading,
    values,
    errors,
    serverErrors,
    touched,
    isValid,
    avatarUri,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    onPrevStep,
    setServerErrors,
    setAvatarUri,
  } = useSignUpData();

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
        {step === 1 && (
          <Button
            className="auth-footer__button"
            type="submit"
            spinner={loading}
            disabled={!isValid}
          >
            {texts.next}
          </Button>
        )}
        {step === 2 && (
          <Button
            className="auth-footer__button"
            type="submit"
            spinner={loading}
            disabled={!isValid}
          >
            {texts.signUp_link}
          </Button>
        )}
        {step === 3 && (
          <Button
            className="auth-footer__button"
            type="submit"
            spinner={loading}
          >
            {texts.finish}
          </Button>
        )}
      </FlexBox>
    );
  };

  const renderStepOne = () => {
    return (
      <>
        <h3 className="mb-4">{texts.create_your_account}</h3>
        <TextField
          id="fullName"
          name="fullName"
          placeholder="Name"
          fullWidth
          onChange={handleChange}
          value={values.fullName}
          onBlur={handleBlur}
          errorMessage={errors.fullName}
          isError={Boolean(touched.fullName && errors.fullName)}
        />
        <TextField
          id="email"
          name="email"
          placeholder="Email"
          fullWidth
          onChange={(e: ChangeInputEvent) => {
            setFieldValue("email", e.target.value);
            setServerErrors({ ...serverErrors, ...{ email: "" } });
          }}
          value={values.email}
          onBlur={handleBlur}
          errorMessage={errors.email || serverErrors.email[0]}
          isError={Boolean(
            (touched.email && errors.email) || serverErrors.email[0]
          )}
        />
        <TextField
          id="phone"
          name="phone"
          placeholder="Phone"
          fullWidth
          onChange={handleChange}
          value={values.phone}
          onBlur={handleBlur}
          errorMessage={errors.phone}
          isError={Boolean(touched.phone && errors.phone)}
        />
        <TextField
          id="username"
          name="username"
          placeholder="Username"
          fullWidth
          onChange={(e: ChangeInputEvent) => {
            setFieldValue("username", e.target.value);
            setServerErrors({ ...serverErrors, ...{ username: "" } });
          }}
          value={values.username}
          onBlur={handleBlur}
          errorMessage={errors.username || serverErrors.username[0]}
          isError={Boolean(
            (touched.username && errors.username) || serverErrors.username[0]
          )}
        />
        <TextField
          id="password"
          name="password"
          placeholder="Password"
          fullWidth
          onChange={handleChange}
          value={values.password}
          onBlur={handleBlur}
          errorMessage={errors.password}
          isError={Boolean(touched.password && errors.password)}
        />
        <div className="mt-3">
          <h6>{texts.date_of_birth_title_signUp}</h6>
          <div className="fs-6 text-grey-0">
            {texts.date_of_birth_text_signUp}
          </div>
          <div className="row mt-3">
            <div className="col-4">
              <Select
                id="date_of_birth"
                name="date_of_birth"
                options={date.getMonthLabels()}
                onChange={(e: ChangeSelectEvent) => {
                  setFieldValue("date_of_birth", {
                    ...values.date_of_birth,
                    month: parseInt(moment().month(e.target.value).format("M")),
                  });
                }}
                value={values.date_of_birth?.month}
                fullWidth
              />
            </div>
            <div className="col-4">
              <Select
                id="date_of_birth"
                name="date_of_birth"
                options={date.getYearsRange()}
                onChange={(e: ChangeSelectEvent) => {
                  setFieldValue("date_of_birth", {
                    ...values.date_of_birth,
                    year: parseInt(e.target.value),
                  });
                }}
                value={values.date_of_birth?.year}
                fullWidth
              />
            </div>
            <div className="col-4">
              <Select
                id="date_of_birth"
                name="date_of_birth"
                options={days}
                onChange={(e: ChangeSelectEvent) => {
                  setFieldValue("date_of_birth", {
                    ...values.date_of_birth,
                    day: parseInt(e.target.value),
                  });
                }}
                value={values.date_of_birth?.day}
                fullWidth
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderStepTwo = () => {
    return (
      <>
        <h3 className="mb-2">{texts.we_sent_you_a_code}</h3>
        <div className="mb-4 text-grey-0">
          {texts.enter_it_below_to_verify + " " + values.email}
        </div>
        <div className="mb-4">
          <TextField
            id="confirmationCode"
            name="confirmationCode"
            placeholder="Verification code"
            value={values.confirmationCode}
            onChange={(e: ChangeInputEvent) => {
              setFieldValue("confirmationCode", e.target.value);
              setServerErrors({
                ...serverErrors,
                ...{ confirmation_code: "" },
              });
            }}
            onBlur={handleBlur}
            errorMessage={
              errors.confirmationCode || serverErrors.confirmation_code
            }
            isError={Boolean(
              (touched.confirmationCode && errors.confirmationCode) ||
                serverErrors.confirmation_code
            )}
            fullWidth
          />
          <div
            className="mt-2 cursor-pointer text-primary"
            onClick={() =>
              toast("We send verification code, please check your email")
            }
          >
            {texts.did_not_receive_email}
          </div>
        </div>
      </>
    );
  };

  const renderStepThree = () => {
    return (
      <>
        <h3 className="mb-2">{texts.pick_a_profile_picture}</h3>
        <div className="mb-4 text-grey-0">
          {texts.have_a_favorite_profile_upload_it_now}
        </div>
        <FlexBox className="mt-5" justifyContent="center">
          <Avatar
            id="profilePicture"
            name="profilePicture"
            src={avatarUri || "/images/profile.png"}
            size={11}
            onChange={async (e: ChangeInputEvent) => {
              setAvatarUri(URL.createObjectURL(e.target.files![0]));
              const data = new FormData();
              data.append("avatar", e.target.files![0]);
              setFieldValue("avatar", data);
            }}
            isPick
          />
        </FlexBox>
      </>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <QuickView
        header={renderHeader()}
        footer={renderFooter()}
        isBack={step > 1}
        onBackClick={onPrevStep}
      >
        <div className="auth-form m-auto py-3">
          {step === 1 && renderStepOne()}
          {step === 2 && renderStepTwo()}
          {step === 3 && renderStepThree()}
        </div>
      </QuickView>
    </form>
  );
};

export default SignUpComponent;
