import { useInitGoogleClient } from "./hooks";

const AuthGoogle = () => {
  const { googleRef } = useInitGoogleClient();

  if (googleRef) {
    return <div ref={googleRef}></div>;
  }

  return null;
};

export default AuthGoogle;
