import { ChannelInfo, EmptyChannelInfo } from "@/components/Type";
import { FC, useState, useEffect } from "react";
import { ViewMessages } from "./Thread-component/ViewMessages";
import { PostMessages } from "./Thread-component/PostMessages";
import { FetchChannelInfo } from "@/methods/Fetch";
import { useRouter } from "next/router";
import { ConvQueryToString } from "@/methods/Tools";

// type Props = {
//   userInfo: UserInfo | undefined;
//   currentState: CurrentState | undefined;
// };

export const Thread: FC = () => {
  const router = useRouter();
  const [channelInfo, setChannelInfo] = useState<ChannelInfo>(EmptyChannelInfo);

  const { channelid } = router.query;

  const channelId = ConvQueryToString(channelid);

  useEffect(() => {
    if (channelId != "default") {
      FetchChannelInfo(channelId, setChannelInfo);
    }
  }, [channelId]);

  if (channelId == "default") {
    return <div>読み込み中・・・</div>;
  } else {
    return (
      <div>
        <div>{channelInfo.channel.name}</div>
        <ViewMessages messages={channelInfo.messages} />
        <PostMessages />
      </div>
    );
  }
};

// useEffect(() => {
//   const fetchUserInfo = async () => {
//     const data = await FetchChannelInfo(
//       (
//         props.currentState ?? {
//           channelid: (props.userInfo?.channels ?? [{ id: "error" }])[0].id,
//         }
//       ).channelid
//     );
//     setChannelInfo(data);
//   };
//   fetchUserInfo();
// }, []);

// const searchParams = new URLSearchParams(window.location.search);
// const channelid: string = searchParams.get("channelid") ?? "default";
