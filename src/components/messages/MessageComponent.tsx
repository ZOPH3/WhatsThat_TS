import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SingleMessage } from '../../types/TSchema';

const MessageBubbleComponent = (props: {
  message: SingleMessage;
  isSelf: boolean;
  position: number;
  triggerDelete: (message_id: number) => void;
}) => {
  const message = props.message;
  const isSelf = props.isSelf;
  const triggerDelete = () => props.triggerDelete(message.message_id);

  return (
    <>
      <View>
        <TouchableOpacity
          style={[isSelf ? styles.self : styles.others]}
          onLongPress={() => triggerDelete()}
        >
          <Text>{isSelf ? 'Me' : `${message.author.first_name} ${message.author.last_name}`}</Text>
          <View onTouchStart={() => console.log(message.timestamp, message.message_id.toString())}>
            <Text style={{ fontSize: 12, color: '#C3C3C3' }}>
              {' '}
              {dateTimeString(new Date(message.timestamp))}
            </Text>
            <Text style={{ fontSize: 16, color: '#fff' }}> {message.message}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const isToday = (date: Date) => {
  const now = new Date();

  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
};

const dateTimeString = (date: Date) => {
  return isToday(date) ? date.toLocaleTimeString() : date.toLocaleString();
};

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

export default MessageBubbleComponent;
