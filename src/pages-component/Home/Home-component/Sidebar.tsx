import { UserInfo, Workspace } from "@/methods/Type";
import { useRouter } from "next/router";
import { FC } from "react";
import { CreateChannel } from "@/pages-component/Home/Home-component/Sidebar-component/Create";
import { JoinChannel } from "@/pages-component/Home/Home-component/Sidebar-component/Join";
import { ListChannels } from "./Sidebar-component/List";
import { ConvQueryToString } from "@/methods/Tools";

type Props = {
  userInfo: UserInfo;
  currentUserId: string;
};

export const Sidebar: FC<Props> = (props) => {
  const router = useRouter();
  const { workspaceid } = router.query;
  const { channelid } = router.query;

  console.log(props.userInfo);

  const listWorkspaces: FC<Array<Workspace>> = (workspaces) => {
    if (workspaces == null) {
      return <div></div>;
    } else {
      return (
        <div>
          {workspaces.map((w) => {
            return (
              <div key={w.id}>
                <button
                  className={w.id == workspaceid ? "bg-blue-100" : ""}
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

  return (
    <div className="flex flex-law">
      <div className="w-6/12 h-[calc(100vh-4rem)] m-1 p-1 rounded bg-blue-50">
        <div className="text-xl text-center">ワークスペース</div>
        <div className="my-1 py-1 border-t border-b border-blue-300">
          <div className="bg-blue-50">参加</div>
          <div>新規作成</div>
        </div>
        <div className="overflow-scroll">
          {listWorkspaces(props.userInfo.workspaces)}
        </div>
      </div>
      <div className="w-6/12 h-[calc(100vh-4rem)] m-1 p-1 rounded bg-blue-50">
        <div className="text-xl text-center">チャンネル</div>
        <div className="my-1 py-1 border-t border-b border-blue-300">
          <JoinChannel
            channels={props.userInfo.channels}
            currentUserId={props.currentUserId}
            workspaceId={ConvQueryToString(workspaceid)}
          />
          <CreateChannel workspaceId={ConvQueryToString(workspaceid)} />
        </div>
        <ListChannels
          channels={props.userInfo.channels}
          workspaceid={ConvQueryToString(workspaceid)}
          channelid={ConvQueryToString(channelid)}
        />
      </div>
    </div>
  );
};

// const listChannels: FC<Array<Channel>> = (channels) => {
//   const { workspaceid } = router.query;

//   if (channels == null) {
//     return <></>;
//   } else {
//     return (
//       <div>
//         {channels.map((c) => {
//           if (workspaceid == c.WorkspaceId) {
//             return (
//               <div key={c.id}>
//                 <button
//                   onClick={() => {
//                     router.push(
//                       `/home?workspaceid=${workspaceid}&channelid=${c.id}`
//                     );
//                   }}
//                 >
//                   {c.name}
//                 </button>
//               </div>
//             );
//           } else {
//             return <></>;
//           }
//         })}
//       </div>
//     );
//   }
// };
