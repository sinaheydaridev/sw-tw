import { memo } from "react";
import { Link } from "react-router-dom";
// hooks
import { useQuickView } from "context/hooks";
// constants
import texts from "constants/texts";
import { LOGIN_ROUTE } from "constants/routes";
// components
import { Button, FlexBox } from "components/shared";
import { SignUpComponent } from "components/auth";
import { TwitterIcon } from "components/icons";
import { QuickViewMode } from "components/shared/QuickView";
import AuthGoogle from "components/auth/AuthGoogle";

const SignUp = () => {
  const { onOpen } = useQuickView();

  return (
    <>
      <SignUpComponent />
      <FlexBox>
        <img
          className="auth_background__image"
          src="/images/twitter-background.jpg"
          alt="twitterImage"
        />
        <div className="ms-3">
          <div className="mt-4">
            <TwitterIcon width={50} height={50} />
          </div>
          <header className="mt-5">
            <h1>{texts.happing_now}</h1>
            <h3 className="mt-3">{texts.join_twitter_today}</h3>
          </header>
          <div className="mt-5">
            <AuthGoogle />
            <Button
              className="mt-3"
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => onOpen(QuickViewMode.default)}
            >
              {texts.signUp_with_email}
            </Button>
          </div>
          <FlexBox className="mt-5 bold" alignItems="center">
            <span>{texts.already_have_an_account}</span>
            <Link to={LOGIN_ROUTE}>
              <Button variant="none" color="primary">
                {texts.signIn_link}
              </Button>
            </Link>
          </FlexBox>
        </div>
      </FlexBox>
    </>
  );
};

export default memo(SignUp);
