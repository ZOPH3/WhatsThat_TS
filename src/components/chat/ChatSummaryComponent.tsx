import React from 'react';
import { ListItem, Avatar, Chip, Stack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { TChatSummary } from '../../types/TSchema';
import { stringToColour } from '../../util/ColorGeneratorUtil';

//TODO: isUnread is determined by the time of the last message and when the user last opened the message (which would be saved to the state).
const ChipStack = () => {
  return (
    <Stack fill center spacing={4}>
      <Chip label="Filled" />
    </Stack>
  );
};

/**
 * Home screen chat list
 */

const ChatSummaryListComponent = (props: { key: number; chatSummary: TChatSummary }) => {
  const navigation = useNavigation();
  const { chatSummary } = props;

  const title = chatSummary.name != '' ? chatSummary.name : chatSummary.creator.first_name;
  const secondaryText = chatSummary.last_message?.message ?? 'No Messages';
  const avatar = (
    <Avatar label={`${title}`} color={`${stringToColour(`${chatSummary.chat_id}${title}`)}`} />
  );
  const toChatWindow = () => {
    navigation.navigate('Chat', { title: title, chat_id: chatSummary.chat_id });
  };

  return (
    <>
      <ListItem
        leadingMode="avatar"
        leading={avatar}
        title={title}
        secondaryText={secondaryText}
        trailing={() => <ChipStack />}
        onPress={toChatWindow}
      />
    </>
  );
};

export default ChatSummaryListComponent;
