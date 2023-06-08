import { FC, useEffect, useState } from "react";
import { SettingsHeader } from "../Header";
import { FetchUserInfo, FetchUserStatistics } from "@/methods/Fetch";
import {
  EmptyUserInfo,
  EmptyUserStatistics,
  UserInfo,
  UserStatistics,
} from "@/methods/Type";
import { fireAuth } from "@/methods/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import {
  ArrowBarToDown,
  ChartBar,
  CircleOff,
  Edit,
  InfoCircle,
} from "tabler-icons-react";
import { ShowIcon } from "@/methods/ShowIcon";
import { UploadIcon } from "@/methods/UploadIcon";
import { RequestEditUser } from "@/methods/RequestEdit";
import { ConvQueryToString } from "@/methods/Tools";
import {
  Modal,
  TextInput,
  PasswordInput,
  Textarea,
  Group,
  Checkbox,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { RequestDeleteUser } from "@/methods/RequestDelete";
import {
  CartesianGrid,
  Legend,
  // BarChart,
  XAxis,
  YAxis,
  // Line,
  Tooltip,
  Bar,
  ResponsiveContainer,
  // LineChart,
} from "recharts";

import dynamic from "next/dynamic";

const BarChart = dynamic(
  () => import("recharts").then((recharts) => recharts.BarChart),
  { ssr: false }
);

export const SettingsUser: FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(EmptyUserInfo);
  const [currentUserId, setCurrentUserId] = useState("");
  const [path, setPath] = useState("/user");
  const router = useRouter();
  const [state, setState] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const { option } = router.query;

  useEffect(() => {
    setState(ConvQueryToString(option));
    if (option == "delete") {
      open();
    }
  }, [option]);

  useEffect(() => {
    onAuthStateChanged(fireAuth, (currentUser) => {
      setCurrentUserId(currentUser?.uid ?? "");
    });
  }, []);

  useEffect(() => {
    FetchUserInfo(currentUserId, setUserInfo);
  }, [currentUserId]);

  useEffect(() => {
    setImageUrl(userInfo.user.img);
    setName(userInfo.user.name);
    setBio(userInfo.user.bio);
  }, [userInfo]);

  //----------

  const [userStatistics, setUserStatistics] =
    useState<UserStatistics>(EmptyUserStatistics);

  useEffect(() => {
    if (currentUserId !== undefined) {
      FetchUserStatistics(currentUserId, setUserStatistics);
    }
  }, [currentUserId]);

  //----------

  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      userId: "",
      confirm: false,
    },

    // functions will be used to validate values at corresponding key
    validate: {
      userId: (value) => (value !== currentUserId ? "ID が一致しません" : null),
      confirm: (value) => (!value ? "チェックしてください" : null),
    },
  });

  const handleSubmit = async () => {
    close();
    if (confirm("本当にアカウントを削除しますか？")) {
      if (await RequestDeleteUser(currentUserId)) {
        alert("アカウントを削除しました");
        form.reset();
        router.push("/");
      }
    }
  };

  return (
    <div className="w-screen">
      <SettingsHeader
        userInfo={userInfo}
        currentUserId={currentUserId}
        path={path}
        setPath={setPath}
      />
      <div className="flex flex-row]">
        <div className="w-4/12 m-8 p-8 rounded-2xl bg-blue-50">
          <div className="w-full flex flex-row">
            <div className="flex flex-row">
              <InfoCircle size={32} color="darkblue" />
              <div className="text-lg my-auto mx-2">ユーザー基本情報</div>
            </div>
            <button
              className="flex flex-row ml-auto"
              onClick={() => {
                router.push("/settings/user?option=edit");
              }}
            >
              <Edit size={32} />
            </button>
          </div>
          {state == "edit" ? (
            <div className="m-6">
              <UploadIcon imageUrl={imageUrl} setImageUrl={setImageUrl} />
            </div>
          ) : (
            <div className="my-auto mx-2 h-56 w-56 p-4">
              <ShowIcon
                iconId={userInfo.user.img}
                iconSize={192}
                onClick={() => {}}
              />
            </div>
          )}
          <div className="py-2">
            <div className="border-b-2 border-blue-100">
              <div className="px-4">表示名</div>
            </div>
            {state == "edit" ? (
              <input
                className="px-2 outline-none bg-blue-50 w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <div>
                <div className="px-2">{userInfo.user.name}</div>
              </div>
            )}
          </div>
          <div className={`py-2 ${state == "edit" ? "text-blue-300" : ""}`}>
            <div className="border-b-2 border-blue-100">
              <div className="px-4">ユーザーID</div>
            </div>
            <div>
              <div className="px-2">{userInfo.user.id}</div>
            </div>
          </div>
          <div className="py-2">
            <div className="border-b-2 border-blue-100">
              <div className="px-4">プロフィール</div>
            </div>
            {state == "edit" ? (
              <textarea
                className="px-2 outline-none bg-blue-50 w-full resize-none"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            ) : (
              <div>
                <div className="px-2">{userInfo.user.bio}</div>
              </div>
            )}
          </div>
          {state == "edit" ? (
            <div className="flex flex-row-reverse mx-6 mb-1">
              <button
                type="button"
                onClick={async () => {
                  if (confirm("保存しますか？")) {
                    if (
                      await RequestEditUser(currentUserId, name, bio, imageUrl)
                    ) {
                      router.push("/settings/user");
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
                    router.push("/settings/user");
                    setName(userInfo.user.name);
                    setBio(userInfo.user.bio);
                  }
                }}
              >
                <div className="px-1 flex flex-row overflow-auto rounded hover:bg-red-300">
                  <CircleOff size={32} color="red" />
                  <div className="my-auto mx-2 text-red-700">取消</div>
                </div>
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="w-4/12 m-8 p-8 rounded-2xl bg-blue-50">
          <div>
            所属しているワークスペース（合計：
            {(userInfo.workspaces ?? []).length}）
          </div>
          <div>
            所属しているチャンネル（合計：{(userInfo.channels ?? []).length}）
          </div>
          <div>
            自身が管理者であるワークスペース
            {/* （合計：{userInfo.workspaces.filter((w) => {return w.Flag}).length}） */}
          </div>
          <div>
            自身が管理者であるチャンネル（合計：
            {
              (userInfo.channels ?? []).filter((c) => {
                return c.Flag;
              }).length
            }
            ）
          </div>
        </div>
        <div className="w-4/12 m-8 p-8 rounded-2xl bg-blue-50">
          <div className="flex flex-row">
            <ChartBar size={32} color="darkblue" />
            <div className="text-lg my-auto mx-2">ユーザー統計情報</div>
          </div>
          <div className="my-2 border-b-2 border-blue-100">
            <div className="px-4">時間帯別のメッセージ投稿件数</div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              width={300}
              height={250}
              data={userStatistics.messagecounts}
              margin={{ bottom: 30, top: 10, left: -20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="hour"
                interval={2}
                label={{
                  value: "時刻 (GMT)",
                  position: "insideBottom",
                  offset: -15,
                }}
              />
              <YAxis
              // label={{
              //   value: "投稿件数",
              //   position: "insideLeft",
              //   offset: 10,
              //   angle: -90,
              // }}
              />
              <Tooltip />
              {/* <Legend /> */}
              <Bar dataKey="count" fill="#8884d8" />
              {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
            </BarChart>
          </ResponsiveContainer>
          <div className="my-2 border-b-2 border-blue-100">
            <div className="px-4">メッセージの長さの分布</div>
          </div>
        </div>
      </div>
      <Modal opened={opened} onClose={close} title="アカウントの削除">
        <Box maw={300} mx="auto">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <div>
              アカウントを削除します。
              <br />
              この操作は取り消せません！
            </div>
            <Checkbox
              className="my-4"
              mt="md"
              label="この操作が取り消せないことを理解した。"
              {...form.getInputProps("confirm", { type: "checkbox" })}
            />
            <div>ユーザーIDを入力してください。</div>
            <TextInput
              withAsterisk
              label={currentUserId}
              placeholder=""
              {...form.getInputProps("userId")}
            />
            <Group position="center" mt="md">
              <button type="submit" className="text-red-500">
                アカウントを削除
              </button>
            </Group>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
