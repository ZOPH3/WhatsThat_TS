import React from 'react';
import { ListItem } from '@react-native-material/core';

interface IChatSummary {
  title: string;
  secondary: string;
  avatar?: JSX.Element | undefined;
  chips?: JSX.Element | undefined;
  actions?: any;
}

const ChatSummary = ({ avatar, title, secondary, chips, actions }: IChatSummary) => {
  return (
    <ListItem
      leadingMode="avatar"
      leading={avatar}
      title={title}
      secondaryText={secondary}
      trailing={chips}
      onPress={actions}
    />
  );
};

export default ChatSummary;
