import {
  CurrentUserId,
  LogInWithEmail,
  LogInWithGoogle,
} from "@/methods/Authenticate";
import { useRouter } from "next/router";
import { FC, useState, FormEvent } from "react";

export const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const loadHomeWithEmailAndPassword = (
    e: FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ): void => {
    e.preventDefault();
    LogInWithEmail(email, password);
    router.push(`/home`);
  };

  const loadHomeWithGoogle = (): void => {
    LogInWithGoogle();
    router.push(`/home`);
  };

  return (
    <div>
      <div>
        <div>LOG IN</div>
        <div>
          <form
            onSubmit={(e) => {
              loadHomeWithEmailAndPassword(e, email, password);
            }}
          >
            <div>
              <div>EMAIL</div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <div>PASSWORD</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <input type="submit" value="Log in with Email and Password" />
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
            Log in with Google Account
          </button>
        </div>
      </div>
    </div>
  );
};
