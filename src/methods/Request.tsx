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
    alert("サーバーとの接続に失敗しました");
    console.error(err);
    return {};
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

    console.log({ user: { id: userId, name: name } });

    if (!res.ok) {
      throw Error(`Failed to create user: ${res.status}`);
    }
    alert("ユーザーの新規登録に成功しました");
    return res.json();
  } catch (err) {
    alert("サーバーとの接続に失敗しました");
    console.error(err);
    return {};
  }
};
