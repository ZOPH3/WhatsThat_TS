import { IMessageContext } from './types';

const MessageReducer = (state: IMessageContext, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_MESSAGES':
      return { ...state, messageList: payload };
    case 'DELETE_MESSAGE':
      return {
        ...state,
        messageList: state.messageList.filter((item: any) => item.id !== payload),
      };
    case 'SEND_MESSAGE':
      // console.log('payload', payload);
      return { ...state, messageList: [...state.messageList, payload] };
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messageList: state.messageList.map((message: any) => {
          message.id === payload.id ? payload : message;
        }),
      };
    case 'SET_CHAT_ID':
      return { ...state, chat_id: payload };
    default:
      throw new Error(`No case for type ${type} found in MessageReducer.`);
  }
};

export default MessageReducer;
