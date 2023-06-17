import React from 'react';
// import { ListItem } from '@react-native-material/core';
import { List } from 'react-native-paper';

interface IChatSummary {
  title: string;
  secondary: string;
  avatar?: JSX.Element | undefined;
  chips?: JSX.Element | undefined;
  actions?: any;
}

const ChatSummary = ({ avatar, title, secondary, chips, actions }: IChatSummary) => {
  return (
    // <ListItem
    //   leadingMode="avatar"
    //   leading={avatar}
    //   title={title}
    //   secondaryText={secondary}
    //   trailing={chips}
    //   onPress={actions}
    // />
    <List.Item
    title={title}
    description={secondary}
    left={props => avatar}
    right={props => chips}
    onPress={actions}
  />
  );
};

export default ChatSummary;
