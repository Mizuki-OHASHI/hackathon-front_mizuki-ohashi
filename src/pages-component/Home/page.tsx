import { FC, useEffect, useState } from "react";

import { Header } from "./Home-component/Header";
import { Sidebar } from "./Home-component/Sidebar";
import { Thread } from "./Home-component/Thread";
import { FetchUserInfo } from "@/methods/Fetch";
import { CurrentUserId } from "@/methods/Authenticate";
import { EmptyUserInfo, UserInfo } from "@/components/Type";

export const Home: FC = () => {
  const theme = "blue";

  const [userInfo, setUserInfo] = useState<UserInfo>(EmptyUserInfo);

  useEffect(() => {
    FetchUserInfo(CurrentUserId(), setUserInfo);
  }, []);

  return (
    <div className="flex flex-col">
      <Header user={userInfo.user} />
      <div className="flex flex-law">
        <Sidebar userInfo={userInfo} />
        <Thread />
      </div>
    </div>
  );
};
function setUser(user: any) {
  throw new Error("Function not implemented.");
}
