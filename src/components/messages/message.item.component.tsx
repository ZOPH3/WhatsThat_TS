import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MessageType from '../../util/types/message.type';

const MessageBubbleComponent = (props: {
  message: MessageType;
  isSelf: boolean;
  position: number;
  triggerDelete: (message_id: number) => void;
}) => {
  const styles = StyleSheet.create({
    self: {
      textAlign: 'right',
      backgroundColor: '#0078fe',
      padding: 10,
      marginLeft: '40%',
      marginTop: 5,
      marginRight: '5%',
      maxWidth: '55%',
      alignSelf: 'flex-end',
      borderRadius: 20,
    },
    others: {
      textAlign: 'left',
      backgroundColor: '#0078fe',
      padding: 10,
      marginLeft: '5%',
      marginTop: 5,
      marginRight: '40%',
      maxWidth: '55%',
      alignSelf: 'flex-start',
      borderRadius: 20,
    },
  });

  function isToday(date: Date) {
    const now = new Date();

    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }

  function dateTimeString(date: Date) {
    return isToday(date) ? date.toLocaleTimeString() : date.toLocaleString();
  }

  function removeMessage(message_id: number) {
    props.triggerDelete(message_id);
  }
  // key={props.message.message_id}
  return (
    <>
      <View>
        <TouchableOpacity
          style={[props.isSelf ? styles.self : styles.others]}
          onLongPress={() => removeMessage(props.message.message_id)}
        >
          <Text>
            {props.isSelf
              ? 'Me'
              : `${props.message.author.first_name} ${props.message.author.last_name}`}
          </Text>
          <View
            onTouchStart={() =>
              console.log(props.message.timestamp, props.message.message_id.toString())
            }
          >
            <Text style={{ fontSize: 12, color: '#C3C3C3' }}>
              {' '}
              {dateTimeString(new Date(props.message.timestamp))}
            </Text>
            <Text style={{ fontSize: 16, color: '#fff' }}> {props.message.message}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default MessageBubbleComponent;
