// components
import classNames from "classnames";
import { HomeIcon, SearchIcon } from "components/icons";
// constants
import { FlexBox, Touch } from "components/shared";
import { PageActiveEnum } from "constants/enums";
import { useAppConfig } from "context/hooks";

const SideBarNavigation = () => {
  const { pageActive } = useAppConfig();

  const renderHome = () => {
    return (
      <Touch
        className={[
          "mb-3 p-2",
          classNames({ "text-primary": pageActive === PageActiveEnum.home }),
        ].join(" ")}
      >
        <HomeIcon width={27} height={27} />
      </Touch>
    );
  };

  const renderSearch = () => {
    return (
      <Touch
        className={[
          "mb-3 p-2",
          classNames({ "text-primary": pageActive === PageActiveEnum.search }),
        ].join(" ")}
      >
        <SearchIcon width={27} height={27} />
      </Touch>
    );
  };

  return (
    <div className="position-sticky bg-white w-100 top-0">
      <div className="bg-white vh-100 py-2 pe-3">
        <FlexBox alignItems="end" direction="column">
          {renderHome()}
          {renderSearch()}
        </FlexBox>
      </div>
    </div>
  );
};

export default SideBarNavigation;
