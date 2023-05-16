import React from 'react';
import { ListItem, Avatar, Chip } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { ChatSummary } from '../../types/api.schema.types';

//TODO: isUnread is determined by the time of the last message and when the user last opened the message (which would be saved to the state).

/**
 * Home screen chat list
 */

const ListItemComponent = (props: { key: number; chatSummary: ChatSummary }) => {
  const navigation = useNavigation();
  const chatSummary = props.chatSummary;

  return (
    <>
      <ListItem
        leadingMode="avatar"
        leading={generateAvatar(chatSummary)}
        title={generateTitle(chatSummary)}
        secondaryText={generateLastMessage(chatSummary)}
        trailing={generateUnreadChip(true)}
        onPress={() => {
          navigation.navigate('Chat', {
            title: generateTitle(chatSummary),
            chat_id: chatSummary.chat_id,
          });
        }}
      />
    </>
  );
};

const generateUnreadChip = (isUnread: boolean) => {
  return isUnread ? <Chip label="Filled" color="primary" /> : <></>;
};

const generateAvatar = (chatSummary: ChatSummary) => {
  return <Avatar label={`${generateTitle(chatSummary)}`} color={`${randomNumber()}`} />;
};

const generateTitle = (chatSummary: ChatSummary) => {
  return chatSummary.name != '' ? chatSummary.name : chatSummary.creator.first_name;
};

const generateLastMessage = (chatSummary: ChatSummary) => {
  return chatSummary.last_message?.message ?? 'No Messages';
};

const randomNumber = () => {
  const generateRandomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  return `#${generateRandomColor}`;
};

export default ListItemComponent;
