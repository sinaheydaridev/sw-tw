import { FC } from "react";
import classNames from "classnames";
import { ChevronLeftIcon, CloseIcon } from "components/icons";
// constants
import texts from "constants/texts";
// context
import { useQuickView } from "context/hooks";
// components
import BackDrop from "./BackDrop";
import Button from "./Button";
import FlexBox from "./FlexBox";
import Scrollbar from "./Scrollbar";
import Touch from "./Touch";

export enum QuickViewMode {
  default = "default",
  save = "save",
}

interface IQuickView {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  isBack?: boolean;
  onBackClick?: () => void;
}

const QuickView: FC<IQuickView> = ({
  children,
  header,
  footer,
  isBack,
  onBackClick,
}) => {
  const { onClose, isOpen, mode } = useQuickView();
  const rootClasses = classNames(
    "quick-view d-flex align-items-center justify-content-center",
    {
      "d-none": !isOpen,
    }
  );

  return (
    <div className={rootClasses}>
      <BackDrop onClick={onClose} isOpen={isOpen} />
      <div className="wrapper bg-white">
        <FlexBox className="header px-2" alignItems="center">
          <header className="w-100">
            <FlexBox alignItems="center">
              {isBack ? (
                <Touch onClick={onBackClick}>
                  <ChevronLeftIcon />
                </Touch>
              ) : (
                <Touch onClick={onClose}>
                  <CloseIcon width={20} height={16} />
                </Touch>
              )}
              <div className="w-100">
                {mode === QuickViewMode.save && (
                  <FlexBox
                    className="mt-2"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <div className="h-100 ps-5">{header}</div>
                    <Button className="save" variant="contained" color="dark">
                      {texts.save_button_quick_view}
                    </Button>
                  </FlexBox>
                )}
                {mode === QuickViewMode.default && <div>{header}</div>}
              </div>
            </FlexBox>
          </header>
        </FlexBox>
        <Scrollbar className="content px-4">{children}</Scrollbar>
        <FlexBox className="footer px-2" alignItems="center">
          <footer className="w-100">{footer}</footer>
        </FlexBox>
      </div>
    </div>
  );
};

export default QuickView;
