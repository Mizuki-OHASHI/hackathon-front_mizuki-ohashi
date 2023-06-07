import { LogInWithEmail, LogInWithGoogle } from "@/methods/Authenticate";
import { useRouter } from "next/router";
import { FC, useState, FormEvent } from "react";

export const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const loadHomeWithEmailAndPassword = async (
    e: FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => {
    e.preventDefault();
    if (await LogInWithEmail(email, password)) {
      router.push("/home");
    }
  };

  const loadHomeWithGoogle = async () => {
    if (await LogInWithGoogle()) {
      router.push("/home");
    }
  };

  return (
    <div>
      <div>
        <div>ログイン</div>
        <div>
          <form
            onSubmit={(e) => {
              loadHomeWithEmailAndPassword(e, email, password);
            }}
          >
            <div>
              <div>メールアドレス</div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <div>パスワード</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <input
              type="submit"
              value="メールアドレスとパスワードでログインする"
            />
          </form>
        </div>
      </div>
      <div>
        <div>
          <button
            onClick={() => {
              loadHomeWithGoogle();
            }}
          >
            Google アカウントでログインする
          </button>
        </div>
      </div>
    </div>
  );
};
