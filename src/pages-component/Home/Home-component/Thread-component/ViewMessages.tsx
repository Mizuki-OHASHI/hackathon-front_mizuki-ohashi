import { Message } from "@/methods/Type";

import { FC } from "react";
import { MessageWrapper } from "@/pages-component/Home/Home-component/Thread-component/MessageWrapper";

type Props = {
  messages: Array<Message>;
  currentUserId: string;
  updateMessage: () => void;
};

export const ViewMessages: FC<Props> = (props) => {
  if (props.messages == null) {
    return <div></div>;
  } else {
    return (
      <div className="absolute top-[104px] right-2 bottom-[20%] left-[33%] overflow-scroll">
        <div className="pb-72">
          {props.messages.map((m) => {
            if (m.deleted) {
              return (
                <div
                  key={m.id}
                  className="text-gray-500 border-2 border-gray-200 rounded-lg m-2 p-2"
                >
                  このメッセージは削除されました
                </div>
              );
            }
            return (
              <MessageWrapper
                key={m.id}
                updateMessage={props.updateMessage}
                message={m}
                currentUserId={props.currentUserId}
              />
            );
          })}
        </div>
      </div>
    );
  }
};
