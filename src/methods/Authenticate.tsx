import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { fireAuth } from "@/methods/firebase";

export const CurrentUserId = (): string => {
  return fireAuth.currentUser?.uid ?? "ユーザの認証に失敗しました";
};

export const LogOut = (): void => {
  if (confirm("ログアウトしますか？")) {
    signOut(fireAuth)
      .then(() => {
        alert("ログアウトに成功しました");
      })
      .catch((err) => {
        alert(err);
      });
  }
};

export const LogInWithGoogle = (): boolean => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(fireAuth, provider)
    .then((res) => {
      const user = res.user;
      alert(`ログイン中のユーザー: ${user.displayName}`);
      return true;
    })
    .catch((err) => {
      const errorMessage = err.message;
      alert(errorMessage);
      return false;
    });
  return true;
};

export const LogInWithEmail = (email: string, pwd: string): boolean => {
  const auth = getAuth();
  // setPersistence(auth, browserSessionPersistence);
  signInWithEmailAndPassword(auth, email, pwd)
    .then((res) => {
      const user = res.user;
      alert(`ログイン中のユーザー: ${user.email}`);
      return true;
    })
    .catch((err) => {
      const errorCode = err.code;
      const errorMessage = err.message;
      switch (errorCode) {
        case "auth/wrong-password":
          alert("パスワードが違います");
        case "auth/user-not-found":
          if (
            confirm(
              `アカウントが見つかりません
              このメールアドレスとパスワードで新規登録しますか？
              Email: ${email}
              Password: ${pwd}`
            )
          ) {
            RegisterWithEmail(email, pwd);
          }
        case "auth/invalid-email;":
          alert("メールアドレスが無効です");
        case "auth/user-disabled;":
          alert("アカウントが無効です");
        default:
          alert(`${errorCode} : ${errorMessage}`);
      }
      return false;
    });
  return false;
};

export const RegisterWithEmail = (email: string, pwd: string): boolean => {
  if (
    confirm(
      `このメールアドレスとパスワードで新規登録しますか？
        Email: ${email}
        Password: ${pwd}`
    )
  ) {
    const auth = getAuth();
    // setPersistence(auth, browserSessionPersistence);
    createUserWithEmailAndPassword(auth, email, pwd)
      .then((res) => {
        const user = res.user;
        alert(`ログイン中のユーザー: ${user.email}`);
        return true;
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        switch (errorCode) {
          case "auth/email-already-in-use":
            LogInWithEmail(email, pwd);
          case "auth/weak-password":
            alert("パスワードが脆弱です");
          case "auth/invalid-email":
            alert("メールアドレスが無効です");
          case "auth/operation-not-allowed":
            alert("操作が許可されていません");
          default:
            alert(`${errorCode} : ${errorMessage}`);
        }
        return false;
      });
  }
  return false;
};
