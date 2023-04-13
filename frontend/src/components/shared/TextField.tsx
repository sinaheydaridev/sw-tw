import { FC } from "react";
import classNames from "classnames";
// components
import FlexBox from "./FlexBox";

interface ITextField {
  className?: string;
  id?: string;
  name?: string;
  fullWidth?: boolean;
  placeholder?: string;
  type?: "text" | "password";
  value?: string | number;
  isError?: boolean;
  errorMessage?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
}

const TextField: FC<ITextField> = ({
  className,
  id = "field",
  name = "field",
  fullWidth,
  type,
  placeholder = "Enter text",
  value = "",
  isError = false,
  errorMessage,
  onChange,
  onBlur,
}) => {
  const rootClasses = classNames("text-field", className, {
    "w-100": fullWidth,
  });
  const inputClasses = classNames("w-100 h-100 px-2", {
    "error": isError,
  });

  return (
    <FlexBox className="mb-3" direction="column">
      <div className={rootClasses}>
        <input
          className={inputClasses}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
      {isError && <div className="text-danger fs-6 ms-2">{errorMessage}</div>}
    </FlexBox>
  );
};

export default TextField;
