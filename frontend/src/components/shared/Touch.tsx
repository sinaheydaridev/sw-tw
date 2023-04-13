import React, { FC } from "react";
import classNames from "classnames";
// components
import FlexBox from "./FlexBox";

interface ITouch {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Touch: FC<ITouch> = ({ children, className, onClick }) => {
  const rootClasses = classNames(
    "close touch rounded-circle w-auto h-auto p-1",
    className
  );

  return (
    <FlexBox
      className={rootClasses}
      justifyContent="center"
      alignItems="center"
      onClick={onClick}
    >
      {children}
    </FlexBox>
  );
};

export default Touch;
