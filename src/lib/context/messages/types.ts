import { TSingleMessage, TChat } from '../../types/TSchema';

export interface IMessageContext {
  messageList: Partial<TSingleMessage>[];
  chat_id?: number;
  chat_details?: TChat;
  dispatcher?: IMessageDispatcher;
}

export interface IMessageDispatcher {
  print: () => void;
  setMessages: (payload: Partial<TSingleMessage>[]) => void;
  deleteMessage: (payload: number) => void;
  sendMessage: (payload: Partial<TSingleMessage>) => void;
  updateMessage: (payload: Partial<TSingleMessage>) => void;
}
