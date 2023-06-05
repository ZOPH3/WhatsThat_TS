import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface IMessageBubble {
  message: string;
  author: string;
  date: string;
  isSelf: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  actions: Function; //FIXME change to onPress onLongPress etc
}

const MessageBubble = ({
  message,
  author,
  date,
  isSelf = false,
  actions,
}: IMessageBubble) => {

  return (
    <>
      <View>
        <TouchableOpacity
          style={[isSelf ? styles.self : styles.others]}
          onLongPress={() => actions()}
        >
          <Text>{author}</Text>
          <View onTouchStart={() => console.log(date)}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  date: { fontSize: 12, color: '#C3C3C3' },
  messageText: { fontSize: 16, color: '#fff' },
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

export default MessageBubble;
