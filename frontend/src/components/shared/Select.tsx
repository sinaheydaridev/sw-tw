import classNames from "classnames";
import { FC } from "react";

interface ISelect {
  id: string;
  name: string;
  options: string[] | number[];
  fullWidth?: boolean;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  value?: any;
}

const Select: FC<ISelect> = ({
  id = "",
  name = "",
  options,
  fullWidth = false,
  value = "",
  onChange,
}) => {
  const rootClasses = classNames("text-field", {
    "w-100": fullWidth,
  });

  return (
    <div className={rootClasses}>
      <select
        id={id}
        name={name}
        className="ps-2 h-100 w-100"
        onChange={onChange}
        defaultValue={value}
      >
        {options.map((opt, i) => (
          <option className="h-100" key={i}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
