import { FC } from "react";
import classNames from "classnames";

type FlexMode =
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "start"
  | "end"
  | "center";

export interface IFlexBox {
  className?: string;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  justifyContent?: FlexMode;
  alignItems?: FlexMode;
  alignSelf?: FlexMode;

  flex?: number;
  children?: React.ReactNode;
  onClick?: () => void;
}

const FlexBox: FC<IFlexBox> = ({
  className,
  direction,
  justifyContent,
  alignItems,
  alignSelf,
  flex,
  children,
  onClick,
}) => {
  const rootClasses = classNames("d-flex", className, {
    "justify-content-between": justifyContent === "space-between",
    "justify-content-around": justifyContent === "space-around",
    "justify-content-evenly": justifyContent === "space-evenly",
    "justify-content-start": justifyContent === "start",
    "justify-content-end": justifyContent === "end",
    "justify-content-center": justifyContent === "center",
    "align-items": alignItems === "space-between",
    "align-items-around": alignItems === "space-around",
    "align-items-evenly": alignItems === "space-evenly",
    "align-items-start": alignItems === "start",
    "align-items-end": alignItems === "end",
    "align-items-center": alignItems === "center",
    "align-self": alignSelf === "space-between",
    "align-self-around": alignSelf === "space-around",
    "align-self-evenly": alignSelf === "space-evenly",
    "align-self-start": alignSelf === "start",
    "align-self-end": alignSelf === "end",
    "align-self-center": alignSelf === "center",
    [`flex-${flex}`]: flex,
    "flex-column": direction === "column",
    "flex-column-reverse": direction === "column-reverse",
    "flex-row": direction === "row",
    "flex-row-reverse": direction === "row-reverse",
  });

  return (
    <div className={rootClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export default FlexBox;
