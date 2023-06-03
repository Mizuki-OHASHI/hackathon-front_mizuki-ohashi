import { FC, useEffect, useState } from "react";
import { SettingsHeader } from "../Header";
import { FetchUserInfo } from "@/methods/Fetch";
import { EmptyUserInfo, UserInfo } from "@/methods/Type";
import { fireAuth } from "@/methods/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const SettingsChannel: FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(EmptyUserInfo);
  const [currentUserId, setCurrentUserId] = useState("");
  const [path, setPath] = useState("/channel");

  useEffect(() => {
    onAuthStateChanged(fireAuth, (currentUser) => {
      setCurrentUserId(currentUser?.uid ?? "");
    });
  }, []);

  FetchUserInfo(currentUserId, setUserInfo);
  return (
    <SettingsHeader
      userInfo={userInfo}
      currentUserId={currentUserId}
      path={path}
      setPath={setPath}
    />
  );
};
