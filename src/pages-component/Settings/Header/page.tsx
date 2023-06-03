import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { UserInfo } from "@/methods/Type";
import { DropdownMenus } from "./DropdownMenu";
import {
  BrandSamsungpass,
  InfoCircle,
  EditCircle,
  Logout,
  Settings,
  Home,
} from "tabler-icons-react";
import { LogOut } from "@/methods/Authenticate";
import { useRouter } from "next/router";

type Props = {
  userInfo: UserInfo;
  currentUserId: string;
  path: string;
  setPath: Dispatch<SetStateAction<string>>;
};

export const SettingsHeader: FC<Props> = (props) => {
  const userMenus = [
    {
      label: "ユーザー情報照会",
      path: `/user?type=refer`,
      icon: <InfoCircle size={16} />,
    },
    {
      label: "ユーザー情報編集",
      path: `/user?type=edit`,
      icon: <EditCircle size={16} />,
    },
  ];

  const channelMenus = [
    {
      label: "チャンネル情報照会",
      path: "/channel?type=refer",
      icon: <InfoCircle size={16} />,
    },
    {
      label: "チャンネル情報編集",
      path: "/channel?type=edit",
      icon: <EditCircle size={16} />,
    },
    {
      label: "公開パスワード変更",
      path: "/channel?type=password",
      icon: <BrandSamsungpass size={16} />,
    },
  ];

  const workspaceMenus = [
    {
      label: "ワークスペース情報照会",
      path: "/workspace?type=refer",
      icon: <InfoCircle size={16} />,
    },
    {
      label: "ワークスペース情報編集",
      path: "/workspace?type=edit",
      icon: <EditCircle size={16} />,
    },
    {
      label: "公開パスワード変更",
      path: "/workspace?type=password",
      icon: <BrandSamsungpass size={16} />,
    },
  ];

  const router = useRouter();
  useEffect(() => {
    router.push(`/settings/${props.path}`);
  }, [props.path]);

  return (
    <div className="h-12 w-screen bg-blue-900 text-white flex flex-row">
      <div className="h-12 w-2/12 text-center flex flex-row">
        <button
          className="h-12 w-4/12 my-auto flex flex-row hover:bg-blue-800"
          onClick={() => {
            router.push("/home");
          }}
        >
          <Home className="m-auto" size={32} />
        </button>
        <button
          className="h-12 w-8/12 text-2xl my-auto flex flex-row hover:bg-blue-800"
          onClick={() => {
            props.setPath("");
          }}
        >
          <div className="mx-4 my-auto">設定</div>
          <Settings size={32} className="my-auto" />
        </button>
      </div>
      <DropdownMenus
        path={props.path}
        setPath={props.setPath}
        name="ユーザー設定"
        menues={userMenus}
      />
      <DropdownMenus
        path={props.path}
        setPath={props.setPath}
        name="チャンネル設定"
        menues={channelMenus}
      />
      <DropdownMenus
        path={props.path}
        setPath={props.setPath}
        name="ワークスペース設定"
        menues={workspaceMenus}
      />

      <div className="w-4/12 ">
        <div className="flex flex-row-reverse">
          <div className="h-12">
            <button
              className="h-12"
              onClick={() => {
                LogOut();
                router.push("/");
              }}
            >
              <div className="flex flex-row text-blue-900 hover:bg-blue-800 hover:text-white">
                <Logout size={32} color="white" className="m-2" />
                <div className="text-sm mr-2 my-auto">ログアウト</div>
              </div>
            </button>
          </div>
          <div className="h-12">
            <button
              className="h-12"
              onClick={() => {
                router.push(`/settings/user?userid=${props.currentUserId}`);
              }}
            >
              <div className="px-2 text-xl text-white py-auto">
                {props.userInfo.user.name}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};