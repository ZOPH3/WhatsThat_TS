import React from 'react';
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
    <List.Item
    title={title}
    description={secondary}
    left={props => avatar}
    right={props => chips}
    onPress={actions.goTo}
    onLongPress={actions.edit}
  />
  );
};

export default ChatSummary;
