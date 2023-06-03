import {
  Box,
  Checkbox,
  Group,
  Modal,
  PasswordInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { FC, FormEvent, useEffect, useState } from "react";
import { RequestJoinChannel } from "@/methods/Request";
import { FetchChannelInfo, FetchWorkspaceInfo } from "@/methods/Fetch";
import {
  Channel,
  EmptyWorkspaceInfo,
  UserInfo,
  WorkspaceInfo,
} from "@/methods/Type";

type Props = {
  channels: Array<Channel>;
  currentUserId: string;
  workspaceId: string;
};

export const JoinChannel: FC<Props> = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [workspaceInfo, setWorkspaceInfo] =
    useState<WorkspaceInfo>(EmptyWorkspaceInfo);
  const [channelsToJoin, setChannelsToJoin] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [channelToJoin, setChannelToJoin] = useState("");

  const handleSubmit = (values: typeof form.values) => {
    RequestJoinChannel(
      props.currentUserId,
      channelsToJoin.find((c) => {
        return c.label == channelToJoin;
      })?.value,
      values.password,
      values.owner
    );
    form.reset();
    close();
  };

  const form = useForm({
    initialValues: {
      password: "",
      owner: false,
    },
  });

  useEffect(() => {
    FetchWorkspaceInfo(props.workspaceId, setWorkspaceInfo);
  }, [props.currentUserId, props.workspaceId]);

  useEffect(() => {
    if (workspaceInfo.channels != null && props.channels != null) {
      setChannelsToJoin(
        workspaceInfo.channels.map((c) => {
          if (
            props.channels.some((c_) => {
              return c_.id == c.id;
            })
          ) {
            return { value: c.id, label: c.name, disabled: true };
          } else {
            return { value: c.id, label: c.name };
          }
        })
      );
    }
  }, [workspaceInfo, props.channels]);

  return (
    <div className="overflow-scroll">
      <div className="hover:bg-blue-200 px-4 rounded">
        <button onClick={open}>参加</button>
      </div>
      <Modal opened={opened} onClose={close} title="チャンネルに参加">
        <Box maw={300} mx="auto">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Select
              label="チャンネル"
              placeholder="チャンネルを１つ選択"
              searchable
              onSearchChange={setChannelToJoin}
              searchValue={channelToJoin}
              nothingFound="一致するチャンネルがありません"
              data={channelsToJoin}
            />
            <PasswordInput
              withAsterisk
              label={form.values.owner ? "管理者用パスワード" : "パスワード"}
              placeholder=""
              {...form.getInputProps("password")}
            />
            <Checkbox
              mt="md"
              label="管理者として参加する"
              {...form.getInputProps("owner", { type: "checkbox" })}
            />
            <Group position="center" mt="md">
              <button type="submit">参加</button>
            </Group>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
