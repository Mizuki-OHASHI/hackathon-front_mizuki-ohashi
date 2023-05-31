import { UserInfo, ChannelInfo } from "@/components/Type";
import { Dispatch, SetStateAction } from "react";

const uri = process.env.NEXT_PUBLIC_BACK_END_URI;
const ver = process.env.NEXT_PUBLIC_BACK_END_VERSION;

export const Fetch = async (
  api: string,
  method: string,
  dict: any
): Promise<any> => {
  try {
    const res = await fetch(`${uri}/v${ver}/${api}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dict }),
    });

    const userInfo = (await res.json()) as UserInfo;

    if (userInfo.error.code != 0) {
      alert(
        `エラー
        ${userInfo.error.detail}`
      );
    }
    return userInfo;
  } catch (err) {
    alert("サーバーとの接続に失敗しました1");
    console.error(err);
    return;
  }
};

export const FetchUserInfo = async (
  userId: string,
  setUserInfo: Dispatch<SetStateAction<UserInfo>>
) => {
  if (userId == "error") {
    alert("読み込みに失敗しました2");
    return;
  }
  try {
    const res = await fetch(`${uri}/v${ver}/user?id=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const userInfo = (await res.json()) as UserInfo;

    if (userInfo.error.code != 0) {
      alert(
        `エラー
        ${userInfo.error.detail}`
      );
    }

    setUserInfo(userInfo);
    return;
  } catch (err) {
    alert("サーバーとの接続に失敗しました3");
    console.error(err);
    return;
  }
};

export const FetchChannelInfo = async (
  channelId: string,
  setChannelInfo: Dispatch<SetStateAction<ChannelInfo>>
) => {
  if (channelId == undefined) {
    alert("読み込みに失敗しました");
    return;
  }
  try {
    const res = await fetch(`${uri}/v${ver}/channel?id=${channelId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const channelInfo = (await res.json()) as ChannelInfo;

    if (channelInfo.error.code != 0) {
      alert(
        `エラー
        ${channelInfo.error.detail}`
      );
    }

    setChannelInfo(channelInfo);
    return;
  } catch (err) {
    alert("サーバーとの接続に失敗しました7");
    console.error(err);
    return;
  }
};
