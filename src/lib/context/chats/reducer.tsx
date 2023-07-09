import { TSingleMessage } from '../../types/TSchema';
import chatActions from './actions';
import { IChatContext } from './types';

/**
 * @description Reducer for ChatContext
 */
const ChatReducer = (state: IChatContext, action: { type: chatActions; payload: any }) => {
  const { type, payload } = action;

  switch (type) {
    case chatActions.SET_CHAT_SUMMARY_LIST:
      return {
        ...state,
        chatSummaryList: payload,
      };
    case 'ADD_CHAT_SUMMARY':
      return {
        ...state,
        chatSummaryList: [...state.chatSummaryList, payload],
      };
    case 'UPDATE_CHAT_SUMMARY':
      return {
        ...state,
        chatSummaryList: state.chatSummaryList.map((chatSummary) =>
          chatSummary.chat_id === payload.chat_id ? payload : chatSummary
        ),
      };
    case 'DELETE_CHAT_SUMMARY':
      return {
        ...state,
        chatSummaryList: state.chatSummaryList.filter(
          (chatSummary) => chatSummary.chat_id !== payload
        ),
      };
    case 'SET_MESSAGES':
      return {
        ...state,
        chatSummaryList: state.chatSummaryList.map((chatSummary) =>
          chatSummary.chat_id === payload.chat_id
            ? { ...chatSummary, messages: payload.messages }
            : chatSummary
        ),
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        chatSummaryList: state.chatSummaryList.map((chatSummary) =>
          chatSummary.chat_id === payload.chat_id
            ? {
                ...chatSummary,
                messages: [...chatSummary.messages, payload.message as TSingleMessage],
              }
            : chatSummary
        ),
      };
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        chatSummaryList: state.chatSummaryList.map((chatSummary) =>
          chatSummary.chat_id === payload.chat_id
            ? {
                ...chatSummary,
                messages: chatSummary.messages.map((message) =>
                  message.message_id === payload.message_id ? payload : message
                ),
              }
            : chatSummary
        ),
      };
    case 'DELETE_MESSAGE':
      return {
        ...state,
        chatSummaryList: state.chatSummaryList.map((chatSummary) =>
          chatSummary.chat_id === payload.chat_id
            ? {
                ...chatSummary,
                messages: chatSummary.messages.filter(
                  (message) => message.message_id !== payload.message_id
                ),
              }
            : chatSummary
        ),
      };
    default:
      throw new Error(`No case for type ${type} found in ChatReducer.`);
  }
};

export default ChatReducer;
