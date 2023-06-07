import { FC, useEffect, useState } from "react";
import { SettingsHeader } from "../Header";
import { FetchUserInfo } from "@/methods/Fetch";
import { EmptyUserInfo, UserInfo } from "@/methods/Type";
import { fireAuth } from "@/methods/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { ArrowBarToDown, CircleOff, Edit } from "tabler-icons-react";
import { ShowIcon } from "@/methods/ShowIcon";
import { UploadIcon } from "@/methods/UploadIcon";
import { RequestEditUser } from "@/methods/RequestEdit";
import { ConvQueryToString } from "@/methods/Tools";

export const SettingsUser: FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(EmptyUserInfo);
  const [currentUserId, setCurrentUserId] = useState("");
  const [path, setPath] = useState("/user");
  const router = useRouter();
  const [state, setState] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const { option } = router.query;

  useEffect(() => {
    setState(ConvQueryToString(option));
  }, [option]);

  useEffect(() => {
    onAuthStateChanged(fireAuth, (currentUser) => {
      setCurrentUserId(currentUser?.uid ?? "");
    });
  }, []);

  useEffect(() => {
    FetchUserInfo(currentUserId, setUserInfo);
  }, [currentUserId]);

  useEffect(() => {
    setImageUrl(userInfo.user.img);
    setName(userInfo.user.name);
    setBio(userInfo.user.bio);
  }, [userInfo]);

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
          <div className="w-full flex flex-row">
            <div className="text-lg">ユーザー基本情報</div>
            <button
              className="flex flex-row ml-auto"
              onClick={() => {
                router.push("/settings/user?option=edit");
              }}
            >
              <Edit size={32} />
            </button>
          </div>
          {state == "edit" ? (
            <div className="m-6">
              <UploadIcon imageUrl={imageUrl} setImageUrl={setImageUrl} />
            </div>
          ) : (
            <div className="my-auto mx-2 h-56 w-56 p-4">
              <ShowIcon
                iconId={userInfo.user.img}
                iconSize={192}
                onClick={() => {}}
              />
            </div>
          )}
          <div className="py-2">
            <div className="border-b-2 border-blue-100">
              <div className="px-4">表示名</div>
            </div>
            {state == "edit" ? (
              <input
                className="px-2 outline-none bg-blue-50 w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <div>
                <div className="px-2">{userInfo.user.name}</div>
              </div>
            )}
          </div>
          <div
            className={`py-2 ${state == "?option=edit" ? "text-blue-300" : ""}`}
          >
            <div className="border-b-2 border-blue-100">
              <div className="px-4">ユーザーID</div>
            </div>
            <div>
              <div className="px-2">{userInfo.user.id}</div>
            </div>
          </div>
          <div className="py-2">
            <div className="border-b-2 border-blue-100">
              <div className="px-4">プロフィール</div>
            </div>
            {state == "edit" ? (
              <textarea
                className="px-2 outline-none bg-blue-50 w-full resize-none"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            ) : (
              <div>
                <div className="px-2">{userInfo.user.bio}</div>
              </div>
            )}
          </div>
          {state == "edit" ? (
            <div className="flex flex-row-reverse mx-6 mb-1">
              <button
                type="button"
                onClick={async () => {
                  if (confirm("保存しますか？")) {
                    if (
                      await RequestEditUser(currentUserId, name, bio, imageUrl)
                    ) {
                      router.push("/settings/user");
                    }
                  }
                }}
              >
                <div className="px-1 flex flex-row overflow-auto rounded hover:bg-blue-300">
                  <ArrowBarToDown size={32} color="darkblue" />
                  <div className="my-auto mx-2">保存</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm("取り消しますか？ 変更内容は保存されません！")) {
                    router.push("/settings/user");
                    setName(userInfo.user.name);
                    setBio(userInfo.user.bio);
                  }
                }}
              >
                <div className="px-1 flex flex-row overflow-auto rounded hover:bg-red-300">
                  <CircleOff size={32} color="red" />
                  <div className="my-auto mx-2 text-red-700">取消</div>
                </div>
              </button>
            </div>
          ) : (
            <></>
          )}
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
          <div>メッセージ投稿の時間帯</div>
          <div>メッセージの長さの分布</div>
        </div>
      </div>
    </div>
  );
};
