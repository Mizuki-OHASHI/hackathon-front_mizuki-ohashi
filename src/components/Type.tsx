export type User = {
  id: string;
  name: string;
  deleted: boolean;
  bio: string;
  img: string;
};

export type Channel = {
  id: string;
  name: string;
  createdAt: string;
  bio: string;
  PublicPw: string;
  PrivatePw: string;
  Deleted: boolean;
  Flag: boolean;
};

export type Workspace = {
  id: string;
  name: string;
  deleted: boolean;
  bio: string;
  img: string;
};

export type Message = {
  id: string;
  title: string;
  body: string;
  postedat: string;
  postedby: string;
  name: string;
  channelId: string;
  edited: boolean;
  deleted: boolean;
};

export type Error = {
  code: number;
  detail: string;
};

export type UserInfo = {
  user: User;
  workspaces: Array<Workspace>;
  channels: Array<Channel>;
  error: Error;
};

export type ChannelInfo = {
  channel: Channel;
  members: Array<User>;
  messages: Array<Message>;
  error: Error;
};

export type WorkspaceInfo = {
  workspace: Workspace;
  members: Array<User>;
  channels: Array<Channel>;
  error: Error;
};

export type MessageCUD = {
  message: Message;
};

export type UserCUD = {
  user: User;
};

export type JoinInfo = {
  userid: string;
  direction: string;
  id: string;
  password: string;
  owner: boolean;
};

/*


export const NilUser: User = {
  id: "",
  name: "",
  deleted: false,
  bio: "",
  img: "",
};

export const EmptyUser : Array<User> = []


export type Icon = {
  id: string;
  name: string;
  size: number;
};



export const NilChannel: Channel = {
  id: "",
  name: "",
  createdAt: "",
  bio: "",
  PublicPw: "",
  PrivatePw: "",
  Deleted: false,
  Flag: false
}

export const EmptyChannel : Array<Channel> = []




export const EmptyWorkspace : Array<Workspace> = []




export const EmptyMessage : Array<Message> = []


export type Info = {
  in: string;
  out: Array<string>;
  inid: string;
}

export type Map = {
  info: Info;
  users: Array<User>;
  messages: Array<Message>;
  channels: Array<Channel>;
  workspaces: Array<Workspace>;
}

export const NilMap: Map = {
  info: {
    in: "",
    out: [],
    inid: ""
  },
  users: EmptyUser,
  messages: EmptyMessage,
  channels: EmptyChannel,
  workspaces: EmptyWorkspace
}



export type Map_ = {
  map: Map;
  error: number
}

export const NilMap_ = {
  map: NilMap,
  error: 1
}


export type Cert = {
  certId: string;
  certPw: string
}

export type MapCert = {
  cert: Cert;
  map: Map
}
*/
