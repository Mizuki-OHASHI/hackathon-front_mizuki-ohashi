import { Channel, UserInfo, Workspace } from "@/components/Type";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { CreateChannel } from "./Sidebar-component/Create";
import { JoinChannel } from "./Sidebar-component/Join";

type Props = {
  userInfo: UserInfo;
};

export const Sidebar: FC<Props> = (props) => {
  const router = useRouter();

  useEffect(() => {}, []);

  const listWorkspaces: FC<Array<Workspace>> = (workspaces) => {
    if (workspaces == null) {
      return <div>読み込み中・・・</div>;
    } else {
      return (
        <div>
          {workspaces.map((w) => {
            return (
              <div key={w.id}>
                <button
                  onClick={() => {
                    router.push(`/home?workspaceid=${w.id}&channelid=default`);
                  }}
                >
                  {w.name}
                </button>
              </div>
            );
          })}
        </div>
      );
    }
  };
  const listChannels: FC<Array<Channel>> = (channels) => {
    const { workspaceid } = router.query;

    if (channels == null) {
      return <div>読み込み中・・・</div>;
    } else {
      return (
        <div>
          {channels.map((c) => {
            return (
              <div key={c.id}>
                <button
                  onClick={() => {
                    router.push(
                      `/home?workspaceid=${workspaceid}&channelid=${c.id}`
                    );
                  }}
                >
                  {c.name}
                </button>
              </div>
            );
          })}
        </div>
      );
    }
  };
  return (
    <div className="flex flex-law">
      <div>
        <div>ワークスペースの検索</div>
        <div>{listWorkspaces(props.userInfo.workspaces)}</div>
      </div>
      <div>
        <JoinChannel />
        <CreateChannel />
        <div>{listChannels(props.userInfo.channels)}</div>
      </div>
    </div>
  );
};
