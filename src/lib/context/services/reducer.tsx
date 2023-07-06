import { TDraftMessage } from './types';

const ServicesReducer = (state: any, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_DRAFT_MESSAGE_LIST':
      return {
        ...state,
        draftMessageList: payload,
      };
    case 'ADD_DRAFT_MESSAGE':
      return {
        ...state,
        draftMessageList: [
          ...state.draftMessageList,
          { draft_id: state.draftMessageList.length + 1, ...payload },
        ],
      };
    case 'UPDATE_DRAFT_MESSAGE':
      return {
        ...state,
        draftMessageList: state.draftMessageList.map((message: TDraftMessage) =>
          message.draft_id === payload.draft_id ? payload : message
        ),
      };
    case 'DELETE_DRAFT_MESSAGE':
      return {
        ...state,
        draftMessageList: state.draftMessageList.filter(
          (message: TDraftMessage) => message.draft_id !== payload
        ),
      };
    case 'CLEAR_DRAFT_MESSAGE_LIST':
      return {
        ...state,
        draftMessageList: [] as TDraftMessage[],
      };
    default:
      throw new Error(`No case for type ${type} found in ServicesReducer.`);
  }
};

export default ServicesReducer;
