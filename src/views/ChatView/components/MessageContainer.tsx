/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable camelcase */
import React, { memo } from 'react';
import { List } from 'react-native-paper';

import { useAuth } from '../../../lib/context/auth';

import DialogComponent from '../../../components/Dialog';
import MessageBubble from './MessageBubble';

import { TSingleMessage } from '../../../lib/types/TSchema';

interface IMessageContainer {
  message: TSingleMessage;
}

function MessageContainer({ message, onDelete, onEdit }) {
  const currentUser = useAuth().authState.id;
  const { DialogBlock, showDialog, hideDialog } = DialogComponent();

  const dialogContent = [
    {
      children: (
        <List.Item
          title="Edit"
          description="Edit your message"
          left={(props) => <List.Icon {...props} icon="folder" />}
          onPress={() => {
            console.log('Edit', message.message_id);
            onEdit(message);
            hideDialog();
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
            if (message.message_id) {
              console.log('Delete', message.message_id);
              onDelete(message.message_id);
              hideDialog();
            }
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
        actions={{
          onLongPress: showDialog,
        }}
      />
      <DialogBlock title="Actions" content={dialogContent} />
    </>
  );
}

export default memo(MessageContainer);
