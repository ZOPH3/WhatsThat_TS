import React, { createContext, useContext, useReducer } from 'react';
import { TSingleMessage } from '../types/TSchema';
import useFetchHook from '../hooks/useFetchHook';

interface IMessageDispatcher {
  print: () => void;
  setMessages: (payload: TSingleMessage[]) => void;
  deleteMessage: (payload: number) => void;
  sendMessage: (payload: TSingleMessage) => void;
  updateMessage: (payload: TSingleMessage) => void;
}

interface IMessageContext {
  messageList: TSingleMessage[];
  dispatcher?: IMessageDispatcher;
}

const doNothing = (): void => {
  /* Does nothing */
};

const initialState: IMessageContext = {
  messageList: [],
  // dispatcher: {
  //   print: doNothing,
  //   setMessages: doNothing,
  //   deleteMessage: doNothing,
  //   sendMessage: doNothing,
  //   updateMessage: doNothing,
  // },
};

const MessageContext = createContext<IMessageContext>(initialState);

const messageReducer = (state: IMessageContext, action: any) => {
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
      console.log('payload', payload);
      return { ...state, messageList: [...state.messageList, payload] };
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messageList: state.messageList.map((message: any) => {
          message.id === payload.id ? payload : message;
        }),
      };
    default:
      throw new Error(`No case for type ${type} found in MessageReducer.`);
  }
};

const MessageProvider = ({ children, chat_id }: any) => {
  const [state, dispatch] = useReducer(messageReducer, initialState);
  const { data, isLoading, onFetch, onError, setOnError, getFresh, getCache } = useFetchHook(
    { url: `/chat/${chat_id}`, method: 'GET' },
    true
  );

  const setMessages = (payload: TSingleMessage[]) => {
    dispatch({ type: 'SET_MESSAGES', payload });
  };

  const deleteMessage = (payload: number) => {
    dispatch({ type: 'DELETE_MESSAGE', payload });
  };

  const sendMessage = (payload: TSingleMessage) => {
    dispatch({ type: 'SEND_MESSAGE', payload });
  };

  const updateMessage = (payload: TSingleMessage) => {
    dispatch({ type: 'UPDATE_MESSAGE', payload });
  };

  const fetchMessages = async () => {
    await onFetch(async () => await getCache()).then((data) => {
      setMessages(data.messages);
    }

    );
    await onFetch(async () => await getFresh()).then((data) => {
      setMessages(data.messages);
    }
    );
  };

  const print = () => {
    console.log('state', state);
  };

  return (
    <MessageContext.Provider
      value={{
        messageList: state.messageList,
        dispatcher: { print, deleteMessage, sendMessage, updateMessage, setMessages },
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

const useMessageContext = () => {
  // get the context
  const context = useContext(MessageContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error('useMessageContext was used outside of its Provider');
  }

  return context;
};

export { useMessageContext, MessageProvider };
