import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
// components
import { CameraPlusIcon } from "components/icons";
import FlexBox from "./FlexBox";
import PickFile from "./PickFile";

interface IAvatar {
  id?: string;
  name?: string;
  alt?: string;
  src?: string;
  size?: number;
  isPick?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Avatar: FC<IAvatar> = ({
  id,
  name,
  alt,
  src,
  size = 10,
  isPick = false,
  onChange,
}) => {
  return (
    <div
      className="rounded-circle position-relative"
      style={{ width: size + "rem", height: size + "rem" }}
    >
      <LazyLoadImage
        className="image-cover rounded-circle w-100 h-100"
        alt={alt}
        src={src}
      />
      <FlexBox
        className="position-absolute top-0 w-100 h-100"
        justifyContent="center"
        alignItems="center"
      >
        {isPick && (
          <PickFile
            id={id}
            name={name}
            className="p-4 bg-grey-500"
            icon={<CameraPlusIcon />}
            onChange={onChange}
          />
        )}
      </FlexBox>
    </div>
  );
};

export default Avatar;
