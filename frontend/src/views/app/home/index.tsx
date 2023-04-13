import { memo } from "react";
// hooks
import useHomeViewData from "./hooks";
// components
import { WhatsHapping } from "components/tweets";

const Home = () => {
  const app = useHomeViewData();

  return (
    <div className="py-2">
      <WhatsHapping />
    </div>
  );
};

export default memo(Home);
