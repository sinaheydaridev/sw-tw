import { FC } from "react";
import classnames from "classnames";
// components
import FlexBox from "./FlexBox";
import { ClipLoader } from "react-spinners";

export interface IButton {
  className?: string;
  variant?: "contained" | "outlined" | "none";
  color?: "primary" | "secondary" | "grey" | "dark";
  fullWidth?: boolean;
  type?: "submit" | "button";
  disabled?: boolean;
  icon?: React.ReactNode;
  spinner?: boolean;
  onClick?: () => void;
}

const Button: FC<IButton> = ({
  className,
  variant = "contained",
  color = "primary",
  fullWidth = false,
  children,
  type = "button",
  disabled = false,
  spinner = false,
  icon,
  onClick = () => {},
}) => {
  const rootClasses = classnames("button", className, {
    "primary-contained": variant === "contained" && color === "primary",
    "secondary-contained": variant === "contained" && color === "secondary",
    "grey-contained": variant === "contained" && color === "grey",
    "dark-contained": variant === "contained" && color === "dark",
    "primary-outlined": variant === "outlined" && color === "primary",
    "secondary-outlined": variant === "outlined" && color === "secondary",
    "grey-outlined": variant === "outlined" && color === "grey",
    "dark-outlined": variant === "outlined" && color === "dark",
    none: variant === "none",
    touch: !disabled && variant === "contained",
    "w-100": fullWidth,
    "bg-grey-0 cursor-default": disabled || spinner,
  });

  const renderContent = () => {
    return (
      <>
        {icon && <span className="mb-1 me-2">{icon}</span>}
        <span>{children}</span>
      </>
    );
  };

  return (
    <button className={rootClasses} type={type} disabled={disabled || spinner} onClick={onClick}>
      <FlexBox alignItems="center" justifyContent="center">
        {!spinner && renderContent()}
        {spinner && <ClipLoader color="white" loading={true} size={20} />}
      </FlexBox>
    </button>
  );
};

export default Button;
