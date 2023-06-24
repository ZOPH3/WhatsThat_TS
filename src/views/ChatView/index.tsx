import React from 'react';
import ChatViewContainer from './ChatViewContainer';
import { MessageProvider } from '../../lib/context/MessageContext';

const ChatView = ({ route }) => {
  return (
    <MessageProvider chat_id={route.params.chat_id}>
      <ChatViewContainer chat_id={route.params.chat_id} title={route.params.chat_name} />
    </MessageProvider>
  );
};

export default ChatView;
