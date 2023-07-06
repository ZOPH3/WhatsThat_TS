/* eslint-disable camelcase */
import React from 'react';
import ChatViewContainer from './ChatViewContainer';

import { MessageProvider } from '../../lib/context/messages';

function ChatView({ route, navigation }) {
  const { chat_id } = route.params;
  return (
    <MessageProvider chat_id={chat_id}>
      <ChatViewContainer />
    </MessageProvider>
  );
}

export default ChatView;
