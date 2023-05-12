import React from 'react';
import { ListItem, Avatar, Chip } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { ChatSummary } from '../../types/api.schema.types';

function isUnread(isUnread: boolean) {
  if (isUnread) {
    return <Chip label="Filled" color="primary" />;
  } else {
    return <></>;
  }
}

//TODO: isUnread is determined by the time of the last message and when the user last opened the message (which would be saved to the state).

/**
 * Home screen chat list
 */

const ListItemComponent = (props: { key: number; chatSummary: ChatSummary }) => {
  // const navigation = useNavigation();
  const navigation = useNavigation();

  return (
    <>
      <ListItem
        leadingMode="avatar"
        leading={
          <Avatar
            label={
              props.chatSummary.name != ''
                ? props.chatSummary.name.concat(props.chatSummary.creator.first_name)
                : props.chatSummary.creator.first_name
            }
            autoColor
          />
        }
        title={
          props.chatSummary.name != ''
            ? props.chatSummary.name
            : props.chatSummary.creator.first_name
        }
        secondaryText={props.chatSummary.last_message?.message}
        trailing={isUnread(true)}
        onPress={() => {
          navigation.navigate('Chat', {
            title:
              props.chatSummary.name != ''
                ? props.chatSummary.name
                : props.chatSummary.creator.first_name,
            chat_id: props.chatSummary.chat_id,
          });
        }}
      />
    </>
  );
};

export default ListItemComponent;
