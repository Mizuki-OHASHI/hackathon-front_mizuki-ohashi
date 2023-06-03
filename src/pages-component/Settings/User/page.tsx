import { FC, useEffect, useState } from "react";
import { SettingsHeader } from "../Header";
import { FetchUserInfo } from "@/methods/Fetch";
import { EmptyUserInfo, UserInfo } from "@/methods/Type";
import { fireAuth } from "@/methods/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

export const SettingsUser: FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(EmptyUserInfo);
  const [currentUserId, setCurrentUserId] = useState("");
  const [path, setPath] = useState("/user");
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(fireAuth, (currentUser) => {
      setCurrentUserId(currentUser?.uid ?? "");
    });
  }, []);

  FetchUserInfo(currentUserId, setUserInfo);
  return (
    <div className="w-screen">
      <SettingsHeader
        userInfo={userInfo}
        currentUserId={currentUserId}
        path={path}
        setPath={setPath}
      />
      <div className="flex flex-row]">
        <div className="w-4/12 m-8 p-8 rounded-2xl bg-blue-50">
          <div>ユーザー基本情報</div>
        </div>
        <div className="w-4/12 m-8 p-8 rounded-2xl bg-blue-50"></div>
        <div className="w-4/12 m-8 p-8 rounded-2xl bg-blue-50"></div>
      </div>
    </div>
  );
};
