import { FC, useEffect, useState } from "react";
import { SettingsHeader } from "../Header";
import { FetchUserInfo } from "@/methods/Fetch";
import { EmptyUserInfo, UserInfo } from "@/methods/Type";
import { fireAuth } from "@/methods/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { Edit } from "tabler-icons-react";

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
          <div className="w-12/12 flex flex-row">
            <div>ユーザー基本情報</div>
            <button
              className="flex flex-row ml-auto"
              onClick={() => {
                router.push("/settings/user?type=edit");
              }}
            >
              <div>編集</div>
              <Edit size={32} />
            </button>
          </div>
          <div>
            <div className="h-72 w-72 bg-blue-100">アイコン</div>
          </div>
          <div>
            <div>表示名</div>
            <div>{userInfo.user.name}</div>
          </div>
          <div>
            <div>ユーザーID</div>
            <div>{userInfo.user.id}</div>
          </div>
          <div>
            <div>プロフィール</div>
            <div>{userInfo.user.bio}</div>
          </div>
        </div>
        <div className="w-4/12 m-8 p-8 rounded-2xl bg-blue-50">
          <div>
            所属しているワークスペース（合計：
            {(userInfo.workspaces ?? []).length}）
          </div>
          <div>
            所属しているチャンネル（合計：{(userInfo.channels ?? []).length}）
          </div>
          <div>
            自身が管理者であるワークスペース
            {/* （合計：{userInfo.workspaces.filter((w) => {return w.Flag}).length}） */}
          </div>
          <div>
            自身が管理者であるチャンネル（合計：
            {
              (userInfo.channels ?? []).filter((c) => {
                return c.Flag;
              }).length
            }
            ）
          </div>
        </div>
        <div className="w-4/12 m-8 p-8 rounded-2xl bg-blue-50">
          <div>ユーザー統計情報</div>
          <div>メッセージ投稿件数の推移</div>
          <div>メッセージの長さの分布</div>
        </div>
      </div>
    </div>
  );
};
