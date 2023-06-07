import { MyError } from "@/methods/Type";
import { GetDateTime } from "./Tools";
import { rejects } from "assert";

const uri = process.env.NEXT_PUBLIC_BACK_END_URI;
const ver = process.env.NEXT_PUBLIC_BACK_END_VERSION;

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

export const RequestEditReply = async (
  replyId: string,
  title: string,
  body: string,
  userId: string,
  updateReply: () => void
) => {
  try {
    const res = await fetch(`${uri}/v${ver}/reply`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reply: { id: replyId, title: title, body: body, postedby: userId },
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
    updateReply();
    return;
  } catch (err) {
    alert("サーバーとの接続に失敗しました10");
    console.error(err);
    return;
  }
};

export const RequestEditUser = async (
  userId: string,
  name: string,
  bio: string,
  img: string
) => {
  try {
    const res = await fetch(`${uri}/v${ver}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: { id: userId, name: name, bio: bio, img: img },
      }),
    });

    const error = (await res.json()) as MyError;

    if (error.code != 0) {
      alert(
        `エラー
        ${error.detail}`
      );
      return false;
    }

    alert("ユーザー情報を編集しました");
    return true;
  } catch (err) {
    alert("サーバーとの接続に失敗しました10u");
    console.error(err);
    return false;
  }
};
