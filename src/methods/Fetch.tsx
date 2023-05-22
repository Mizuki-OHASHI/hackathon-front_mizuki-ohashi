import { UserInfo } from "@/components/Type";

const uri = process.env.NEXT_PUBLIC_BACK_END_URI;
const ver = process.env.NEXT_PUBLIC_BACK_END_VERSION;

// Template
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

    if (!res.ok) {
      throw Error(`Failed to ${method}: ${res.status}`);
    }

    return res.json();
  } catch (err) {
    alert("Failed to connect to the server");
    console.error(err);
    return {};
  }
};

export const FetchUserInfo = async (
  userid: string
): Promise<UserInfo | undefined> => {
  try {
    const res = await fetch(`${uri}/v${ver}/user?id=${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw Error(`Failed to GET user info: ${res.status}`);
    }

    const userInfo = (await res.json()) as UserInfo;

    return userInfo;
  } catch (err) {
    alert("Failed to connect to the server");
    console.error(err);

    return;
  }
};
