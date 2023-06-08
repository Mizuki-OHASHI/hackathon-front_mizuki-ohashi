import { FC, useEffect, useState } from "react";
import { Channel } from "@/methods/Type";
import { useRouter } from "next/router";
import {
  ArrowBarToDown,
  CircleOff,
  Edit,
  InfoCircle,
} from "tabler-icons-react";
import { RequestEditChannel } from "@/methods/RequestEdit";
import { ConvQueryToString } from "@/methods/Tools";
import {
  Modal,
  TextInput,
  Group,
  Checkbox,
  Box,
  Input,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { RequestDeleteUser } from "@/methods/RequestDelete";

type Props = {
  currentUserId: string;
  channel: Channel;
};

export const BasicChannelInfo: FC<Props> = (props) => {
  const router = useRouter();
  const [state, setState] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [publicPw, setPublicPw] = useState("");
  const [privatePw, setPrivatePw] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const { option } = router.query;

  useEffect(() => {
    setState(ConvQueryToString(option));
    if (option == "delete") {
      open();
    }
  }, [option]);

  useEffect(() => {
    // setImageUrl(props.userInfo.user.img);
    setName(props.channel.name);
    setBio(props.channel.bio);
    setPublicPw(props.channel.publicPw);
  }, [props.channel]);

  // useEffect(() => {
  //   setImageUrl(props.userInfo.user.img);
  //   setName(props.userInfo.user.name);
  //   setBio(props.userInfo.user.bio);
  // }, [props.userInfo]);

  const form = useForm({
    initialValues: {
      channelId: "",
      confirm: false,
    },

    // functions will be used to validate values at corresponding key
    validate: {
      channelId: (value) =>
        value !== props.channel.id ? "ID が一致しません" : null,
      confirm: (value) => (!value ? "チェックしてください" : null),
    },
  });

  const handleSubmit = async () => {
    close();
    if (confirm("本当にチャンネルを削除しますか？")) {
      if (await RequestDeleteUser(props.currentUserId)) {
        alert("チャンネルを削除しました");
        form.reset();
        router.push("/settings");
      }
    }
  };

  return (
    <>
      <div className="w-full flex flex-row">
        <div className="flex flex-row">
          <InfoCircle size={32} color="darkblue" />
          <div className="text-lg my-auto mx-2">チャンネル基本情報</div>
        </div>
        {props.channel.flag ? (
          <button
            className="flex flex-row ml-auto"
            onClick={() => {
              router.push("/settings/channel?option=edit");
            }}
          >
            <Edit size={32} />
          </button>
        ) : (
          <></>
        )}
      </div>
      {/* {state == "edit" ? (
        <div className="m-6">
          <UploadIcon imageUrl={imageUrl} setImageUrl={setImageUrl} />
        </div>
      ) : (
        <div className="my-auto mx-2 h-56 w-56 p-4">
          <ShowIcon
            iconId={props.userInfo.user.img}
            iconSize={192}
            onClick={() => {}}
          />
        </div>
      )} */}
      <div className="py-2">
        <div className="border-b-2 border-blue-100">
          <div className="px-4">チャンネル名</div>
        </div>
        {state == "edit" ? (
          <input
            className="px-2 outline-none bg-blue-50 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div>
            <div className="px-2">{props.channel?.name}</div>
          </div>
        )}
      </div>
      <div className={`py-2 ${state == "edit" ? "text-blue-300" : ""}`}>
        <div className="border-b-2 border-blue-100">
          <div className="px-4">チャンネルID</div>
        </div>
        <div>
          <div className="px-2">{props.channel?.id}</div>
        </div>
      </div>
      <div className="py-2">
        <div className="border-b-2 border-blue-100">
          <div className="px-4">説明</div>
        </div>
        {state == "edit" ? (
          <textarea
            className="px-2 outline-none bg-blue-50 w-full resize-none"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        ) : (
          <div>
            <div className="px-2">{props.channel?.bio}</div>
          </div>
        )}
      </div>
      <div className="py-2">
        <div className="border-b-2 border-blue-100">
          <div className="px-4">公開パスワード</div>
        </div>
        {state == "edit" ? (
          <input
            className="px-2 outline-none bg-blue-50 w-full"
            value={publicPw}
            onChange={(e) => setPublicPw(e.target.value)}
          />
        ) : (
          <div>
            <div className="px-2">
              {props.channel?.publicPw ?? "パスワードなし"}
            </div>
          </div>
        )}
      </div>

      {state == "edit" && props.channel.flag ? (
        <>
          <PasswordInput
            placeholder="管理者用パスワード"
            value={privatePw}
            onChange={(e) => {
              setPrivatePw(e.target.value);
            }}
            className="m-4"
          />
          <div className="flex flex-row-reverse mx-6 mb-1">
            <button
              type="button"
              onClick={async () => {
                if (confirm("保存しますか？")) {
                  if (
                    await RequestEditChannel(
                      props.currentUserId,
                      props.channel.id,
                      name,
                      bio,
                      publicPw,
                      privatePw
                      // imageUrl
                    )
                  ) {
                    setName(props.channel.name);
                    setBio(props.channel.bio);
                    setPublicPw(props.channel.publicPw);
                    setPrivatePw("");
                    router.push(
                      `/settings/channel?channelid=${props.channel?.id}`
                    );
                  }
                }
              }}
            >
              <div className="px-1 flex flex-row overflow-auto rounded hover:bg-blue-300">
                <ArrowBarToDown size={32} color="darkblue" />
                <div className="my-auto mx-2">保存</div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirm("取り消しますか？ 変更内容は保存されません！")) {
                  router.push("/settings/channel");
                  setName(props.channel.name);
                  setBio(props.channel.bio);
                  setPublicPw(props.channel.publicPw);
                  setPrivatePw("");
                }
              }}
            >
              <div className="px-1 flex flex-row overflow-auto rounded hover:bg-red-300">
                <CircleOff size={32} color="red" />
                <div className="my-auto mx-2 text-red-700">取消</div>
              </div>
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
      <Modal opened={opened} onClose={close} title="アカウントの削除">
        <Box maw={300} mx="auto">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <div>
              チャンネルを削除します。
              <br />
              この操作は取り消せません！
            </div>
            <Checkbox
              className="my-4"
              mt="md"
              label="この操作が取り消せないことを理解した。"
              {...form.getInputProps("confirm", { type: "checkbox" })}
            />
            <div>チャンネルIDを入力してください。</div>
            <TextInput
              withAsterisk
              label={props.channel.id}
              placeholder={props.channel.id}
              {...form.getInputProps("channelId")}
            />
            <Group position="center" mt="md">
              <button type="submit" className="text-red-500">
                チャンネルを削除
              </button>
            </Group>
          </form>
        </Box>
      </Modal>
    </>
  );
};
