import React from 'react';
import { TSingleMessage } from '../../../lib/types/TSchema';
import MessageBubble from './MessageBubble';

interface IMessageContainer {
  message: TSingleMessage;
  actions: IMessageActions;
}

interface IMessageActions {
  delete: () => void;
  edit: () => void;
}

const MessageContainer = ({ message, actions }: IMessageContainer) => {
  const currentUser = 16; //FIXME Replace with the context

  const isToday = (date: Date) => {
    const now = new Date();

    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  };

  const isSelf = message.author.user_id === currentUser;
  const date = new Date(message.timestamp);
  const author = isSelf ? 'Me' : `${message.author.first_name} ${message.author.last_name}`;

  return (
    <MessageBubble
      message={message.message}
      author={author}
      date={isToday(date) ? date.toLocaleTimeString() : date.toLocaleString()}
      isSelf={isSelf}
      actions={() => actions}
    />
  );
};

export default MessageContainer;
