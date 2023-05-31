import { useRouter } from "next/router";
import { FC } from "react";

export const LP: FC = () => {
  const router = useRouter();
  return (
    <div>
      <div>ようこそ！</div>
      <div>
        <button
          onClick={() => {
            router.push("/register");
          }}
        >
          新規登録
        </button>
        <div></div>
        <button
          onClick={() => {
            router.push("/login");
          }}
        >
          ログイン
        </button>
      </div>
    </div>
  );
};
