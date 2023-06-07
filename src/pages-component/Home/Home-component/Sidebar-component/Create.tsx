import {
  Box,
  Checkbox,
  Group,
  Modal,
  PasswordInput,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { FC, useEffect, useState } from "react";
import {
  RequestCreateChannel,
  RequestCreateWorkspace,
} from "@/methods/RequestCreate";

type ChannelProps = {
  workspaceId: string;
  currentUserId: string;
  updateUserInfo: () => void;
};

export const CreateChannel: FC<ChannelProps> = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [pw, setPw] = useState(true);

  const handleSubmit = async (values: typeof form.values) => {
    if (
      await RequestCreateChannel(
        props.currentUserId,
        values.name,
        values.bio,
        pw ? values.publicPassword : "",
        values.privatePassword,
        props.workspaceId
      )
    ) {
      props.updateUserInfo();
      form.reset();
      close();
    }
  };

  const form = useForm({
    initialValues: {
      name: "",
      privatePassword: "",
      confirmPrivatePassword: "",
      password: true,
      publicPassword: "",
      confirmPublicPassword: "",
      bio: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? "チャンネル名は２字以上" : null),
      privatePassword: (value) =>
        value.length < 8 ? "パスワードは８字以上" : null,
      confirmPrivatePassword: (value, values) =>
        value !== values.privatePassword ? "パスワードが一致しません" : null,
      publicPassword: (value) =>
        value.length < 8 && pw ? "パスワードは８字以上" : null,
      confirmPublicPassword: (value, values) =>
        value !== values.publicPassword && pw
          ? "パスワードが一致しません"
          : null,
    },
  });

  useEffect(() => {
    setPw(form.values.password);
  }, [form.values.password]);

  return (
    <div>
      <div className="hover:bg-blue-200 px-4 rounded">
        <button onClick={open} className="w-full">
          新規作成
        </button>
      </div>
      <Modal opened={opened} onClose={close} title="チャンネルの新規作成">
        <Box maw={300} mx="auto">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              withAsterisk
              label="チャンネル名"
              placeholder=""
              {...form.getInputProps("name")}
            />
            <PasswordInput
              withAsterisk
              label="管理者用パスワード（変更不可）"
              placeholder=""
              {...form.getInputProps("privatePassword")}
            />
            <PasswordInput
              withAsterisk
              label="管理者用パスワード（確認）"
              placeholder=""
              {...form.getInputProps("confirmPrivatePassword")}
            />
            <Checkbox
              mt="md"
              label="参加時にパスワードを要求する"
              {...form.getInputProps("password", { type: "checkbox" })}
            />
            {pw ? (
              <>
                <PasswordInput
                  withAsterisk
                  label="公開用パスワード（変更可）"
                  placeholder=""
                  {...form.getInputProps("publicPassword")}
                />
                <PasswordInput
                  withAsterisk
                  label="公開用パスワード（確認）"
                  placeholder=""
                  {...form.getInputProps("confirmPublicPassword")}
                />
              </>
            ) : (
              <></>
            )}
            <Textarea
              withAsterisk
              label="説明"
              placeholder="後から追加することもできます"
              {...form.getInputProps("bio")}
            />
            <Group position="center" mt="md">
              <button type="submit">新規作成</button>
            </Group>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

type WorkspaceProps = {
  currentUserId: string;
  updateUserInfo: () => void;
};

export const CreateWorkspace: FC<WorkspaceProps> = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [pw, setPw] = useState(true);

  const handleSubmit = async (values: typeof form.values) => {
    if (
      await RequestCreateWorkspace(
        props.currentUserId,
        values.name,
        values.bio,
        pw ? values.publicPassword : "",
        values.privatePassword
      )
    ) {
      props.updateUserInfo();
      form.reset();
      close();
    }
  };

  const form = useForm({
    initialValues: {
      name: "",
      privatePassword: "",
      confirmPrivatePassword: "",
      password: true,
      publicPassword: "",
      confirmPublicPassword: "",
      bio: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? "ワークスペース名は２字以上" : null),
      privatePassword: (value) =>
        value.length < 8 ? "パスワードは８字以上" : null,
      confirmPrivatePassword: (value, values) =>
        value !== values.privatePassword ? "パスワードが一致しません" : null,
      publicPassword: (value) =>
        value.length < 8 && pw ? "パスワードは８字以上" : null,
      confirmPublicPassword: (value, values) =>
        value !== values.publicPassword && pw
          ? "パスワードが一致しません"
          : null,
    },
  });

  useEffect(() => {
    setPw(form.values.password);
  }, [form.values.password]);

  return (
    <div>
      <div className="hover:bg-blue-200 px-4 rounded">
        <button onClick={open} className="w-full">
          新規作成
        </button>
      </div>
      <Modal opened={opened} onClose={close} title="ワークスペースの新規作成">
        <Box maw={300} mx="auto">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              withAsterisk
              label="ワークスペース名"
              placeholder=""
              {...form.getInputProps("name")}
            />
            <PasswordInput
              withAsterisk
              label="管理者用パスワード（変更不可）"
              placeholder=""
              {...form.getInputProps("privatePassword")}
            />
            <PasswordInput
              withAsterisk
              label="管理者用パスワード（確認）"
              placeholder=""
              {...form.getInputProps("confirmPrivatePassword")}
            />
            <Checkbox
              mt="md"
              label="参加時にパスワードを要求する"
              {...form.getInputProps("password", { type: "checkbox" })}
            />
            {pw ? (
              <>
                <PasswordInput
                  withAsterisk
                  label="公開用パスワード（変更可）"
                  placeholder=""
                  {...form.getInputProps("publicPassword")}
                />
                <PasswordInput
                  withAsterisk
                  label="公開用パスワード（確認）"
                  placeholder=""
                  {...form.getInputProps("confirmPublicPassword")}
                />
              </>
            ) : (
              <></>
            )}
            <Textarea
              withAsterisk
              label="説明"
              placeholder="後から追加することもできます"
              {...form.getInputProps("bio")}
            />
            <Group position="center" mt="md">
              <button type="submit">新規作成</button>
            </Group>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
