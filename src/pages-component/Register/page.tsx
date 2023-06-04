import {
  CurrentUserId,
  LogInWithGoogle,
  RegisterWithEmail,
} from "@/methods/Authenticate";
import { RequestCreateUser } from "@/methods/Request";
import { useRouter } from "next/router";
import { FC, useState, FormEvent } from "react";

export const Register: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const createUserWithEmailAndPassword = async (
    e: FormEvent<HTMLFormElement>,
    name: string,
    email: string,
    password: string
  ) => {
    e.preventDefault();
    if (await RegisterWithEmail(email, password)) {
      if (await RequestCreateUser(CurrentUserId(), name)) {
        router.push("/home?workspaceid=default&channelid=default");
      }
    }
  };

  const createUserWithGoogle = async (name: string) => {
    if (await LogInWithGoogle()) {
      if (await RequestCreateUser(CurrentUserId(), name)) {
        router.push("/home?workspaceid=default&channelid=default");
      }
    }
  };

  return (
    <div>
      <div>
        <div>新規登録</div>
        <div>
          <div>名前</div>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <form
            onSubmit={(e) => {
              createUserWithEmailAndPassword(e, name, email, password);
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
            <input type="submit" value="メールアドレスとパスワードで登録する" />
          </form>
        </div>
      </div>
      <div>
        <div>
          <button
            onClick={() => {
              createUserWithGoogle(name);
            }}
          >
            Google アカウントで登録する
          </button>
        </div>
      </div>
    </div>
  );
};
