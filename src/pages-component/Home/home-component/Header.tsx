import { User } from "@/components/Type";
import { CurrentUserId } from "@/methods/Authenticate";
import { useRouter } from "next/router";
import { FC } from "react";

type Props = {
  user: User;
};

export const Header: FC<Props> = (props) => {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push(`/setting?userid=${CurrentUserId()}`)}>
        {props.user.name}
      </button>
      {CurrentUserId()}
    </div>
  );
};
