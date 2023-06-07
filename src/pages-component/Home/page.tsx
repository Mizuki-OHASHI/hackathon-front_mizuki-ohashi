import { FC, useEffect, useState } from "react";

import { Header } from "@/pages-component/Home/Home-component/Header";
import { Sidebar } from "@/pages-component/Home/Home-component/Sidebar";
import { Thread } from "@/pages-component/Home/Home-component/Thread";
import { FetchUserInfo } from "@/methods/Fetch";
import { EmptyUserInfo, UserInfo } from "@/methods/Type";
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "@/methods/firebase";

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

  const updateUserInfo = () => {
    FetchUserInfo(currentUserId, setUserInfo);
  };

  return (
    <div className="flex flex-col">
      <div className="fixed top-0 left-0 right-0 h-12 bg-blue-900 text-white">
        <Header user={userInfo.user} currentUserId={currentUserId} />
      </div>
      <div className="fixed top-12 left-0 right-0 bottom-0 flex flex-law">
        <div className="h-full w-4/12 relative">
          <Sidebar
            userInfo={userInfo}
            currentUserId={currentUserId}
            updateUserInfo={updateUserInfo}
          />
        </div>
        <div className="h-full w-8/12 relative">
          <Thread currentUserId={currentUserId} />
        </div>
      </div>
    </div>
  );
};
