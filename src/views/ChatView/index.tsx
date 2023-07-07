/* eslint-disable camelcase */
import React from 'react';
import ChatViewContainer from './ChatViewContainer';

function ChatView({ route, navigation }) {
  const { chat_id } = route.params;
  return <ChatViewContainer chat_id={chat_id} />;
}

export default ChatView;
