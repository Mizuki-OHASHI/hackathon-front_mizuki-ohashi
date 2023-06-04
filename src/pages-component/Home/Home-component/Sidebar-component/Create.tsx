import { Box, Group, Modal, PasswordInput, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { FC, FormEvent, useState } from "react";
import { RequestCreateChannel } from "@/methods/Request";

type Props = {
  workspaceId: string;
};
export const CreateChannel: FC<Props> = (props) => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleSubmit = (values: typeof form.values) => {
    RequestCreateChannel(
      values.name,
      values.bio,
      values.publicPassword,
      values.privatePassword,
      props.workspaceId
    );
    form.reset();
    close();
  };

  const form = useForm({
    initialValues: {
      name: "",
      privatePassword: "",
      confirmPrivatePassword: "",
      publicPassword: "",
      confirmPublicPassword: "",
      bio: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      privatePassword: (value) =>
        value.length < 8 ? "Name must have at least 8 letters" : null,
      confirmPrivatePassword: (value, values) =>
        value !== values.privatePassword ? "Passwords did not match" : null,
      publicPassword: (value) =>
        value.length < 8 ? "Name must have at least 8 letters" : null,
      confirmPublicPassword: (value, values) =>
        value !== values.publicPassword ? "Passwords did not match" : null,
    },
  });

  return (
    <div>
      <div className="hover:bg-blue-200 px-4 rounded">
        <button onClick={open}>新規作成</button>
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
            <TextInput
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
