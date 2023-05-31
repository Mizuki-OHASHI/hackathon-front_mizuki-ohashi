import { Message } from "@/components/Type";
import { Parser } from "@/methods/Parser";
import { ConvDateTime } from "@/methods/Tools";
import { Menu, Button } from "@mantine/core";
import { Trash, DotsVertical, Edit, Messages } from "tabler-icons-react";

import { FC } from "react";
import { CurrentUserId } from "@/methods/Authenticate";

type Props = {
  messages: Array<Message>;
};

export const ViewMessages: FC<Props> = (props) => {
  const messageWrapper = (m: Message): JSX.Element => {
    return (
      <div
        key={m.id}
        className="flex flex-col border-2 border-blue-200 rounded-lg m-2"
      >
        <div>
          <div className="flex flex-law">
            <div className="m-2">{m.name}</div>
            <div className="m-2">{m.title}</div>
            <div className="m-2">{ConvDateTime(m.postedat)}</div>
            <Menu trigger="hover" shadow="md" width={200}>
              <Menu.Target>
                <button>
                  <DotsVertical size={14} />
                </button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>閲覧者メニュー</Menu.Label>
                <Menu.Item
                  onClick={() => {
                    console.log("reply");
                  }}
                  icon={<Messages size={14} />}
                >
                  返信する
                </Menu.Item>

                {m.postedby == CurrentUserId() ? (
                  <>
                    <Menu.Divider />

                    <Menu.Label>投稿者メニュー</Menu.Label>
                    <Menu.Item icon={<Edit size={14} />}>
                      メッセージを編集する
                    </Menu.Item>
                    <Menu.Item color="red" icon={<Trash size={14} />}>
                      メッセージを削除する
                    </Menu.Item>
                  </>
                ) : null}
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
        <div className="border-t-2 border-blue-200 p-2">
          <div>
            <Parser lines={m.body} />
          </div>
        </div>
        <div>
          <div className="text-gray">{m.edited ? "編集済み" : ""}</div>
        </div>
      </div>
    );
  };

  if (props.messages == null) {
    return <div>読み込み中・・・</div>;
  } else {
    return (
      <div>
        {props.messages.map((m) => {
          return messageWrapper(m);
        })}
      </div>
    );
  }
};
