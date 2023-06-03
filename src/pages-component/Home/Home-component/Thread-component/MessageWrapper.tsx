import { Message } from "@/methods/Type";
import { Parser } from "@/methods/Parser";
import { RequestDeleteMessage } from "@/methods/Request";
import { ConvDateTime } from "@/methods/Tools";
import { FC, useState } from "react";
import { Menu } from "@mantine/core";
import { DotsVertical, Messages, Edit, Trash } from "tabler-icons-react";
import { EditMessages } from "@/pages-component/Home/Home-component/Thread-component/EditMessage";

type Props = {
  updateMessage: () => void;
  message: Message;
  currentUserId: string;
};

export const MessageWrapper: FC<Props> = (props) => {
  const [onEdit, setOnEdit] = useState(false);
  return onEdit ? (
    <EditMessages
      updateMessage={props.updateMessage}
      currentUserId={props.currentUserId}
      message={props.message}
      closeEditor={() => {
        setOnEdit(false);
      }}
    />
  ) : (
    <div
      key={props.message.id}
      className="flex flex-col border-2 border-blue-200 rounded-lg m-2"
    >
      <div>
        <div className="flex flex-law">
          <div className="m-2">{props.message.name}</div>
          <div className="m-2">{props.message.title}</div>
          <div className="m-2">{ConvDateTime(props.message.postedat)}</div>
          <Menu trigger="hover" shadow="md" width={200}>
            <Menu.Target>
              <button>
                <DotsVertical size={16} />
              </button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>閲覧者メニュー</Menu.Label>
              <Menu.Item
                onClick={() => {
                  console.log("reply");
                }}
                icon={<Messages size={16} />}
              >
                返信する
              </Menu.Item>

              {props.message.postedby == props.currentUserId ? (
                <>
                  <Menu.Divider />

                  <Menu.Label>投稿者メニュー</Menu.Label>
                  <Menu.Item
                    onClick={() => {
                      setOnEdit(true);
                    }}
                    icon={<Edit size={16} />}
                  >
                    メッセージを編集する
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      if (confirm("削除しますか？")) {
                        console.log(props.message.id);
                        RequestDeleteMessage(
                          props.message.id,
                          props.currentUserId,
                          props.updateMessage
                        );
                      }
                    }}
                    color="red"
                    icon={<Trash size={16} />}
                  >
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
          <Parser lines={props.message.body} />
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <div className="text-gray-500 mx-4">
          {props.message.edited ? "編集済み" : ""}
        </div>
      </div>
    </div>
  );
};
