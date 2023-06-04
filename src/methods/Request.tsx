import { MyError } from "@/methods/Type";
import { GetDateTime } from "./Tools";
import { rejects } from "assert";

const uri = process.env.NEXT_PUBLIC_BACK_END_URI;
const ver = process.env.NEXT_PUBLIC_BACK_END_VERSION;

// Template
export const template_Fetch = async (
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

    if (!res.ok) {
      throw Error(`Failed to ${method}: ${res.status}`);
    }
    alert("@@@に成功しました");
    return res.json();
  } catch (err) {
    alert("サーバーとの接続に失敗しました4");
    console.error(err);
    return;
  }
};

// ------------ CREATE ------------
export const RequestCreateUser = async (userId: string, name: string) => {
  try {
    const res = await fetch(`${uri}/v${ver}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { id: userId, name: name } }),
    });

    const error = (await res.json()) as MyError;

    if (error.code != 0) {
      alert(
        `エラー
        ${error.detail}`
      );
      return false;
    }

    alert("ユーザーの新規登録に成功しました");
    return true;
  } catch (err) {
    alert("サーバーとの接続に失敗しました5");
    console.error(err);
    return false;
  }
};

export const RequestCreateMessage = async (
  userId: string,
  channelId: string,
  replyTo: string,
  title: string,
  body: string,
  updateMessage: () => void
) => {
  try {
    const res = await fetch(`${uri}/v${ver}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          postedby: userId,
          postedat: GetDateTime(),
          channelid: channelId,
          replyto: replyTo,
          title: title,
          body: body,
        },
      }),
    });

    const error = (await res.json()) as MyError;

    if (error.code != 0) {
      alert(
        `エラー
        ${error.detail}`
      );
      return;
    }

    alert("メッセージの送信に成功しました");
    updateMessage();
    return;
  } catch (err) {
    alert("サーバーとの接続に失敗しました6");
    console.error(err);
    return;
  }
};

export const RequestCreateChannel = async (
  name: string,
  bio: string,
  publicPw: string,
  privatePw: string,
  workspaceId: string
) => {
  try {
    const res = await fetch(`${uri}/v${ver}/channel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: {
          name: name,
          bio: bio,
          createdat: GetDateTime(),
          publicpassword: publicPw,
          privatepassword: privatePw,
          workspaceid: workspaceId,
        },
      }),
    });

    const error = (await res.json()) as MyError;
    console.log("test", error);

    if (error.code != 0) {
      alert(
        `エラー
        ${error.detail}`
      );
      return;
    }

    alert("チャンネルの新規登録に成功しました");
    return;
  } catch (err) {
    alert("サーバーとの接続に失敗しました5c");
    console.error(err);
    return;
  }
};

// ------------ JOIN ------------
export const RequestJoinChannel = async (
  userId: string,
  channelId: string | undefined,
  password: string,
  owner: boolean
) => {
  if (channelId == undefined) {
    alert("チャンネルを選択してください");
    return;
  }
  try {
    const res = await fetch(`${uri}/v${ver}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: userId,
        direction: "channel",
        id: channelId,
        password: password,
        owner: owner,
      }),
    });

    const error = (await res.json()) as MyError;

    if (error.code != 0) {
      alert(
        `エラー
        ${error.detail}`
      );
      return;
    }

    alert("チャンネルに参加しました");
    return;
  } catch (err) {
    alert("サーバーとの接続に失敗しました6");
    console.error(err);
    return;
  }
};

// ------------ DELETE ------------
export const RequestDeleteMessage = async (
  messageId: string,
  userId: string,
  updateMessage: () => void
) => {
  try {
    const res = await fetch(`${uri}/v${ver}/message`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: { id: messageId, postedby: userId } }),
    });

    const error = (await res.json()) as MyError;

    if (error.code != 0) {
      alert(
        `エラー
        ${error.detail}`
      );
      return;
    }

    alert("メッセージを削除しました");
    updateMessage();
    return;
  } catch (err) {
    alert("サーバーとの接続に失敗しました9");
    console.error(err);
    return;
  }
};

export const RequestDeleteChannel = async (
  channelId: string,
  userId: string,
  password: string
) => {
  try {
    const res = await fetch(`${uri}/v${ver}/channel`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: { id: channelId, privatepassword: password },
        userid: userId,
      }),
    });

    const error = (await res.json()) as MyError;

    if (error.code != 0) {
      alert(
        `エラー
        ${error.detail}`
      );
      return;
    }

    alert("チャンネルを削除しました");
    return;
  } catch (err) {
    alert("サーバーとの接続に失敗しました11");
    console.error(err);
    return;
  }
};

// ------------ EDIT ------------
export const RequestEditMessage = async (
  messageId: string,
  title: string,
  body: string,
  userId: string,
  updateMessage: () => void
) => {
  try {
    const res = await fetch(`${uri}/v${ver}/message`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: { id: messageId, title: title, body: body, postedby: userId },
      }),
    });

    const error = (await res.json()) as MyError;

    if (error.code != 0) {
      alert(
        `エラー
        ${error.detail}`
      );
      return;
    }

    alert("メッセージを編集しました");
    updateMessage();
    return;
  } catch (err) {
    alert("サーバーとの接続に失敗しました10");
    console.error(err);
    return;
  }
};
