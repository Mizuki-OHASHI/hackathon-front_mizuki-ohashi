import { Reply } from "@/methods/Type";
import { Parser } from "@/methods/Parser";
import { RequestDeleteReply } from "@/methods/RequestDelete";
import { ConvDateTime, ConvQueryToString } from "@/methods/Tools";
import { FC, useState } from "react";
import { Menu } from "@mantine/core";
import { DotsVertical, Edit, Messages, Trash } from "tabler-icons-react";
import { EditReplies } from "@/pages-component/Home/Home-component/Reply-component/EditReply";
import { useRouter } from "next/router";

type Props = {
  updateReply: () => void;
  reply: Reply;
  currentUserId: string;
};

export const ReplyWrapper: FC<Props> = (props) => {
  const [onEdit, setOnEdit] = useState(false);
  const router = useRouter();
  return onEdit ? (
    <EditReplies
      updateReply={props.updateReply}
      currentUserId={props.currentUserId}
      reply={props.reply}
      closeEditor={() => {
        setOnEdit(false);
      }}
    />
  ) : (
    <div
      key={props.reply.id}
      className="flex flex-col border-2 border-blue-200 rounded-lg m-2 bg-blue-50"
    >
      <div>
        <div className="flex flex-law">
          <div className="m-2">{props.reply.name}</div>
          <div className="m-2">{props.reply.title}</div>
          <div className="m-2">{ConvDateTime(props.reply.postedat)}</div>
          <Menu trigger="hover" shadow="md" width={200}>
            <Menu.Target>
              <button>
                <DotsVertical size={16} />
              </button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>閲覧者メニュー</Menu.Label>
              {/* <Menu.Item
                onClick={() => {
                  const { workspaceid, channelid } = router.query;
                  router.push(
                    `/home?workspaceid=${workspaceid}&channelid=${channelid}&replyid=${props.reply.id}`
                  );
                }}
                icon={<Messages size={16} />}
              >
                返信する
              </Menu.Item> */}

              {props.reply.postedby == props.currentUserId ? (
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
                        console.log(props.reply.id);
                        RequestDeleteReply(
                          props.reply.id,
                          props.currentUserId,
                          props.updateReply
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
        <div className="break-words">
          <Parser lines={props.reply.body} />
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <div className="text-gray-500 mx-4">
          {props.reply.edited ? "編集済み" : ""}
        </div>
      </div>
    </div>
  );
};
