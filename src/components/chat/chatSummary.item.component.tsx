import React, { FC } from 'react';
import { ListItem, Avatar, Chip, Stack, Text } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { ChatSummary } from '../../types/api.schema.types';
import { stringToColour } from '../../util/colors.util';

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
        trailing={() => <ChipStack />}
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

const GenerateUnreadChip: FC<{ isUnread: boolean }> = (input) => {
  return input.isUnread ? <Chip label="Filled" color="primary" /> : <></>;
};

const ChipStack = () => {
  return (
    <Stack fill center spacing={4}>
      <Chip label="Filled" />
    </Stack>
  );
};
const generateAvatar = (chatSummary: ChatSummary) => {
  return <Avatar label={`${generateTitle(chatSummary)}`} color={`${generateColor(chatSummary)}`} />;
};

const generateTitle = (chatSummary: ChatSummary) => {
  return chatSummary.name != '' ? chatSummary.name : chatSummary.creator.first_name;
};

const generateLastMessage = (chatSummary: ChatSummary) => {
  return chatSummary.last_message?.message ?? 'No Messages';
};

const generateColor = (chatSummary: ChatSummary) => {
  return stringToColour(`${chatSummary.chat_id}${generateTitle(chatSummary)}`);
};

export default ListItemComponent;
