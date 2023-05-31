import {
  Box,
  Button,
  Checkbox,
  Group,
  Modal,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { FC, FormEvent, useState } from "react";

export const JoinChannel: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    values: typeof form.values
  ) => {
    e.preventDefault();
    // Perform any logic or submit the form here
    alert("チャンネルに参加しました");
  };

  const form = useForm({
    initialValues: {
      name: "text",
      privatePassword: "secret",
      confirmPrivatePassword: "sevret",
      publicPassword: "secret",
      confirmPublicPassword: "sevret",
      bio: "text",
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
      <button onClick={open}>既存のチャンネルに参加</button>
      <Modal opened={opened} onClose={close} title="既存のチャンネルに参加">
        <Box maw={300} mx="auto">
          <form
            onSubmit={(e) => {
              form.onSubmit((values) => {
                handleSubmit(e, values);
              });
            }}
          >
            <TextInput
              withAsterisk
              label="名前"
              placeholder=""
              {...form.getInputProps("name")}
            />
            <PasswordInput
              withAsterisk
              label="管理者用パスワード"
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
              label="公開用パスワード"
              placeholder=""
              {...form.getInputProps("publicPassword")}
            />
            <PasswordInput
              withAsterisk
              label="管理者用パスワード（確認）"
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
              <button type="submit">参加</button>
            </Group>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
