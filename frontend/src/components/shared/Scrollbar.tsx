import { FC, memo } from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

interface IScrollbar {
  className?: string;
  children?: React.ReactNode;
}

const Scrollbar: FC<IScrollbar> = ({ className, children }) => {
  return <SimpleBar className={className}>{children}</SimpleBar>;
};

export default memo(Scrollbar);
