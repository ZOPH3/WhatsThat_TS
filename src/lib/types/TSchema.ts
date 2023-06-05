export type TChatSummary = {
  chat_id: number;
  name: string;
  creator: TUser;
  last_message: TSingleMessage;
};

export type TUser = {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export type TAddUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type TUpdateUser = {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
};

export type TLoginUser = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  id: number;
  token: string;
};

export type TSignUpResponse = {
  user_id: number;
};

export type TCreateChat = {
  name: string;
};

export type TCreateChatResponse = {
  chat_id: number;
};

export type TChat = {
  name: string;
  creator: TUser;
  members: TUser[];
  messages: TSingleMessage[];
};

export type TUpdateChat = {
  name: string;
};

export type TSingleMessage = {
  message_id: number;
  timestamp: number;
  message: string;
  author: TUser;
};

export type TSendMessage = {
  message: string;
};
