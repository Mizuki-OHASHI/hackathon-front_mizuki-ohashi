import { FC, useEffect, useState } from "react";

import { Header } from "@/pages-component/Home/Home-component/Header";
import { Sidebar } from "@/pages-component/Home/Home-component/Sidebar";
import { Thread } from "@/pages-component/Home/Home-component/Thread";
import { FetchUserInfo } from "@/methods/Fetch";
import { EmptyUserInfo, UserInfo } from "@/methods/Type";
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "@/methods/firebase";
import { Rnd } from "react-rnd";
import { headers } from "next/dist/client/components/headers";

export const Home: FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(EmptyUserInfo);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    onAuthStateChanged(fireAuth, (currentUser) => {
      setCurrentUserId(currentUser?.uid ?? "");
    });
  }, []);

  useEffect(() => {
    FetchUserInfo(currentUserId, setUserInfo);
  }, [currentUserId]);

  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="h-12 bg-blue-900 text-white">
        <Header user={userInfo.user} currentUserId={currentUserId} />
      </div>
      <div className="flex flex-law">
        <div className="w-4/12">
          <Sidebar userInfo={userInfo} currentUserId={currentUserId} />
        </div>
        <div className="w-8/12 h-[calc(100vh-12rem)]">
          <Thread currentUserId={currentUserId} />
        </div>
      </div>
    </div>
  );
};
