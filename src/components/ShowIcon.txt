import { Image } from "@mantine/core";
import { FC } from "react";
import { Icon } from "./Type";

type Props = {
  icon: Icon;
  onClick: () => void;
};

export const ShowIcon: FC<Props> = (props) => {
  return (
    <div className="flex justify-center items-center" onClick={props.onClick}>
      <Image
        src={`${props.icon.id}`}
        alt={props.icon.name}
        fit="cover"
        radius="md"
        width={`${props.icon.size / 4}rem`}
        height={`${props.icon.size / 4}rem`}
      />
    </div>
  );
};
