import { ChannelInfo, EmptyChannelInfo, Message } from "@/methods/Type";
import { FC, useState, useEffect } from "react";
import { ViewMessages } from "@/pages-component/Home/Home-component/Thread-component/ViewMessages";
import { PostMessages } from "@/pages-component/Home/Home-component/Thread-component/PostMessages";
import { FetchChannelInfo } from "@/methods/Fetch";
import { useRouter } from "next/router";
import { ConvQueryToString } from "@/methods/Tools";

type Props = {
  currentUserId: string;
};

export const Thread: FC<Props> = (props) => {
  const router = useRouter();
  const [channelInfo, setChannelInfo] = useState<ChannelInfo>(EmptyChannelInfo);

  const { channelid } = router.query;

  const channelId = ConvQueryToString(channelid);

  const updateMessage = (): void => {
    if (channelId != "default") {
      FetchChannelInfo(channelId, setChannelInfo);
    }
  };

  useEffect(() => {
    if (channelId != "default") {
      FetchChannelInfo(channelId, setChannelInfo);
    }
  }, [channelId]);

  if (channelId == "default") {
    return <div></div>;
  } else {
    return (
      <div>
        <div className="text-4xl px-4 py-2">{channelInfo.channel.name}</div>
        <ViewMessages
          messages={channelInfo.messages}
          updateMessage={updateMessage}
          currentUserId={props.currentUserId}
        />
        <PostMessages
          updateMessage={updateMessage}
          currentUserId={props.currentUserId}
        />
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
