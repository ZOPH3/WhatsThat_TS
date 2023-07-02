/* eslint-disable camelcase */
import React from 'react';
import ChatViewContainer from './ChatViewContainer';
import { MessageProvider } from '../../lib/context/MessageContext';
import { useChatContext } from '../../lib/context/ChatContext';

function ChatView({ route, navigation }) {
  const { chat_id } = route.params;
  const { chatSummaryList } = useChatContext();
  const chat = chatSummaryList.find((chat) => chat.chat_id === chat_id);

  if (!chat) {
    alert('Chat not found');
    return navigation.goBack();
  }

  return (
    <MessageProvider chat_id={route.params.chat_id}>
      <ChatViewContainer
        chat_id={route.params.chat_id}
        title={chat?.name ?? 'NOT FOUND'}
        chat={chat}
      />
    </MessageProvider>
  );
}

export default ChatView;
