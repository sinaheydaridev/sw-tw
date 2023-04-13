import { FC } from "react";
// components
import Touch from "./Touch";

interface IPickFile {
  id?: string;
  name?: string;
  className?: string;
  accept?: string;
  icon?: React.ReactNode;
  color?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const PickFile: FC<IPickFile> = ({
  id = "",
  name = "",
  className = "",
  color = "text-white",
  accept = "image/*",
  icon,
  onChange,
}) => {
  return (
    <Touch className={className}>
      <div className={color}>
        <input
          id={id}
          name={name}
          className="pick-file position-absolute w-100 h-100 end-0 start-0 bottom-0 cursor-pointer"
          type="file"
          accept={accept}
          onChange={onChange}
        />
        {icon}
      </div>
    </Touch>
  );
};

export default PickFile;
