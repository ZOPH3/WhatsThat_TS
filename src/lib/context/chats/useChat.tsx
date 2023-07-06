import React, { useContext } from 'react';
import ChatContext from './context';

const useChat = () => {
  const context = React.useContext(ChatContext);

  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }

  return context;
};

export default useChat;
