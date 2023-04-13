import { ClipLoader } from "react-spinners";
import FlexBox from "./FlexBox";

const AppLoading = () => {
  return (
    <FlexBox
      className="position-fixed top-0 bottom-0 start-0 end-0 w-100 h-100 bg-white"
      alignItems="center"
      justifyContent="center"
    >
      <ClipLoader color="blue" loading={true} size={35} />
    </FlexBox>
  );
};

export default AppLoading;
