import React from 'react';
import { TSingleMessage } from '../../../lib/types/TSchema';
import { useAuthContext } from '../../../lib/context/AuthContext';
import { List } from 'react-native-paper';
import DialogComponent from '../../../components/Dialog';
import MessageBubble from './MessageBubble';
import { useMessageContext } from '../../../lib/context/MessageContext';
import { useApiContext } from '../../../lib/context/ApiContext';

interface IMessageContainer {
  message: TSingleMessage;
}

const MessageContainer = ({ message }: IMessageContainer) => {
  const currentUser = useAuthContext().authState.id;
  const { DialogBlock, showDialog } = DialogComponent();
  const { messageList, dispatcher } = useMessageContext();
  const { useFetch } = useApiContext();
  const dialogContent = [
    {
      children: (
        <List.Item
          title="Edit"
          description="Edit your message"
          left={(props) => <List.Icon {...props} icon="folder" />}
          onPress={() => {
            console.log('Edit', message.message_id);
          }}
        />
      ),
    },
    {
      children: (
        <List.Item
          title="Delete"
          description="Delete your message"
          left={(props) => <List.Icon {...props} icon="folder" />}
          onPress={() => {
            console.log('Edit', message.message_id);
          }}
        />
      ),
    },
  ];

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
    <>
      <MessageBubble
        message={message.message}
        author={author}
        date={isToday(date) ? date.toLocaleTimeString() : date.toLocaleString()}
        isSelf={isSelf}
        actions={{ onLongPress: showDialog }}
      />
      <DialogBlock title={'Actions'} content={dialogContent} />
    </>
  );
};

export default MessageContainer;
