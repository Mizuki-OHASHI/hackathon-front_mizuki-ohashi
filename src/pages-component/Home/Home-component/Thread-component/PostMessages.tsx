import { FC, FormEvent, useState } from "react";
import { Parser } from "@/methods/Parser";
import { CreateMessage } from "@/methods/Request";
import { CurrentUserId } from "@/methods/Authenticate";
import { useRouter } from "next/router";
import { channel } from "diagnostics_channel";
import { ConvQueryToString } from "@/methods/Tools";

// type Props = {
//   currentState: CurrentState | undefined;
// };

export const PostMessages: FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();
  const { workspaceid } = router.query;
  const { channelid } = router.query;

  const channelId = ConvQueryToString(channelid);

  const postMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    CreateMessage(CurrentUserId(), channelId, title, body);
    setBody("");
    setTitle("");
  };
  return (
    <div>
      <div>
        <div>プレビュー</div>
        <div className="border-2 border-blue-200 rounded-lg p-2">
          <Parser lines={body} />
        </div>
      </div>
      <div>
        <form onSubmit={(e) => postMessage(e)}>
          <div>
            <div>タイトル</div>
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>
            <div>
              <input type="button" value="タイトルを自動生成"></input>
            </div>
          </div>
          <div>
            <div>
              <textarea
                value={body}
                onChange={(e) => {
                  setBody(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div>
            <div>
              <input type="submit" value="送信"></input>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
