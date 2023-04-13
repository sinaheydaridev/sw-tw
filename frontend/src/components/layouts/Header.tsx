import { Link } from "react-router-dom";
// components
import { ChevronLeftIcon } from "components/icons";
import { FlexBox } from "components/shared";
// constants
import { useAppConfig } from "context/hooks";

const Header = () => {
  const { headerTitle, headerSubTitle, isBack, to } = useAppConfig();

  const renderHeaderTitles = () => {
    if (!headerSubTitle) {
      return (
        <div>
          <h5>{headerTitle}</h5>
        </div>
      );
    }
    return (
      <div className="h-100">
        <h5>{headerTitle}</h5>
        <h6 className="text-grey-0">{headerSubTitle}</h6>
      </div>
    );
  };

  return (
    <header className="main-header container border-bottom bg-white position-sticky top-0">
      <FlexBox className="h-100" alignItems="center">
        {isBack && (
          <Link className="touch rounded-circle me-3" to={to}>
            <ChevronLeftIcon />
          </Link>
        )}
        {renderHeaderTitles()}
      </FlexBox>
    </header>
  );
};

export default Header;
