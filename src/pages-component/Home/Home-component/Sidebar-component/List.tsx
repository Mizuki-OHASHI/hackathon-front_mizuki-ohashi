import { Channel } from "@/methods/Type";
import router from "next/router";
import { FC, useEffect, useState } from "react";
import { Settings } from "tabler-icons-react";

type Props = {
  channels: Array<Channel>;
  workspaceid: string;
  channelid: string;
};

export const ListChannels: FC<Props> = (props) => {
  const [activeChannels, setActiveChannels] = useState<Array<Channel>>([]);

  useEffect(() => {
    if (props.channels != null && props.channels.length > 0) {
      setActiveChannels(
        props.channels.filter((c) => {
          return c.workspaceid == props.workspaceid;
        })
      );
    }
  }, [props.channels, props.workspaceid]);

  return (
    <div>
      {activeChannels.map((c) => {
        return (
          <div
            key={c.id}
            className={`flex flex-row rounded ${
              c.id == props.channelid ? "bg-blue-200" : ""
            } hover:bg-blue-100`}
          >
            <div>
              <button
                className="w-40 text-left text-lg"
                onClick={() => {
                  router.push(
                    `/home?workspaceid=${props.workspaceid}&channelid=${c.id}`
                  );
                }}
              >
                {c.name}
              </button>
            </div>
            <div className="ml-auto">
              <button
                onClick={() => {
                  router.push(`/settings/channel?type=refer&channelid=${c.id}`);
                }}
              >
                <Settings size={16} color="skyblue" className="my-1.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
