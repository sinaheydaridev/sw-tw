import classNames from "classnames";
import { FC } from "react";

interface IBackDrop {
  isOpen?: boolean;
  onClick?: () => void;
}

const BackDrop: FC<IBackDrop> = ({ isOpen = false, onClick }) => {
  const rootClasses = classNames("backdrop", {
    "d-block": isOpen,
  });
  return <div className={rootClasses} onClick={onClick}></div>;
};

export default BackDrop;
