import {
  CurrentUserId,
  LogInWithGoogle,
  RegisterWithEmail,
} from "@/methods/Authenticate";
import { CreateUser } from "@/methods/Request";
import { useRouter } from "next/router";
import { FC, useState, FormEvent } from "react";

export const Register: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const createUserWithEmailAndPassword = (
    e: FormEvent<HTMLFormElement>,
    name: string,
    email: string,
    password: string
  ): void => {
    e.preventDefault();
    RegisterWithEmail(email, password);
    CreateUser(CurrentUserId(), name);
    router.push("/home");
  };

  const createUserWithGoogle = (name: string): void => {
    LogInWithGoogle();
    CreateUser(CurrentUserId(), name);
    router.push("/home");
  };

  return (
    <div>
      <div>
        <div>REGISTER</div>
        <div>
          <div>NAME</div>
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
            <input type="submit" value="Register with Email and Password" />
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
            Register with Google Account
          </button>
        </div>
      </div>
    </div>
  );
};
