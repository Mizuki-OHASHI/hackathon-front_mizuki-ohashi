// ------------ USER ------------
export type User = {
  id: string;
  name: string;
  deleted: boolean;
  bio: string;
  img: string;
};

export const EmptyUser: User = {
  id: "",
  name: "",
  deleted: false,
  bio: "",
  img: "",
};

// ------------ CHANNEL ------------
export type Channel = {
  id: string;
  name: string;
  createdAt: string;
  bio: string;
  PublicPw: string;
  PrivatePw: string;
  Deleted: boolean;
  workspaceid: string;
  Flag: boolean;
};

export const EmptyChannel = {
  id: "",
  name: "",
  createdAt: "",
  bio: "",
  PublicPw: "",
  PrivatePw: "",
  Deleted: false,
  workspaceid: "",
  Flag: false,
};

// ------------ WORKSPACE ------------
export type Workspace = {
  id: string;
  name: string;
  deleted: boolean;
  bio: string;
  img: string;
};

export const EmptyWorkspace: Workspace = {
  id: "",
  name: "",
  deleted: false,
  bio: "",
  img: "",
};

// ------------ MESSAGE ------------
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

// ------------ ERROR ------------
export type MyError = {
  code: number;
  detail: string;
};

export const EmptyError = {
  code: 100,
  detail: "loading",
};

// ------------ INFO ------------
export type UserInfo = {
  user: User;
  workspaces: Array<Workspace>;
  channels: Array<Channel>;
  error: MyError;
};

export const EmptyUserInfo = {
  user: EmptyUser,
  workspaces: [],
  channels: [],
  error: EmptyError,
};

export type ChannelInfo = {
  channel: Channel;
  members: Array<User>;
  messages: Array<Message>;
  error: MyError;
};

export const EmptyChannelInfo: ChannelInfo = {
  channel: EmptyChannel,
  members: [],
  messages: [],
  error: EmptyError,
};

export type WorkspaceInfo = {
  workspace: Workspace;
  members: Array<User>;
  channels: Array<Channel>;
  error: MyError;
};

export const EmptyWorkspaceInfo: WorkspaceInfo = {
  workspace: EmptyWorkspace,
  members: [],
  channels: [],
  error: EmptyError,
};

// ------------ CUD ------------
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

// export type CurrentState = {
//   channelid: string;
//   workspaceid: string;
// };
