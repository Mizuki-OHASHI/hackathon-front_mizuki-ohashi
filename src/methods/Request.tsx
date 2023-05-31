import { MyError } from "@/components/Type";
import { GetDateTime } from "./Tools";

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

export const CreateUser = async (userId: string, name: string) => {
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
      return;
    }

    alert("ユーザーの新規登録に成功しました");
    return;
  } catch (err) {
    alert("サーバーとの接続に失敗しました5");
    console.error(err);
    return;
  }
};

export const CreateMessage = async (
  userId: string,
  channelId: string,
  title: string,
  body: string
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
    return;
  } catch (err) {
    alert("サーバーとの接続に失敗しました6");
    console.error(err);
    return;
  }
};
