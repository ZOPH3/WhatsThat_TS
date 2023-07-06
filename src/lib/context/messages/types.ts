import { TSingleMessage, TChat } from '../../types/TSchema';

export interface IMessageContext {
  messageList: TSingleMessage[];
  chat_id?: number;
  chat_details?: TChat;
  dispatcher?: IMessageDispatcher;
}

export interface IMessageDispatcher {
  setMessages: (payload: TSingleMessage[]) => void;
  deleteMessage: (payload: number) => void;
  sendMessage: (payload: Partial<TSingleMessage>) => void;
  updateMessage: (payload: Partial<TSingleMessage>) => void;
}
