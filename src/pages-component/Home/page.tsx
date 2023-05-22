import { UserInfo } from "@/components/Type";
import { CurrentUserId } from "@/methods/Authenticate";
import { FetchUserInfo } from "@/methods/Fetch";
import { Parser } from "@/methods/Pasrser";
import { FC, useEffect, useState } from "react";

export const Home: FC = () => {
  const theme = "blue";

  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await FetchUserInfo(CurrentUserId());
      setUserInfo(data);
    };
    fetchUserInfo();
  });

  console.log(userInfo);

  return (
    <div>
      <Parser lines={message} />
      <form>
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></textarea>
      </form>
    </div>
  );
};
