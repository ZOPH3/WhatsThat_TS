import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import DialogComponent from '../../../components/Dialog';

interface IMessageBubble {
  message: string;
  author: string;
  date: string;
  isSelf: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  actions: any;
}

const MessageBubble = ({ message, author, date, isSelf = false, actions }: IMessageBubble) => {
  const { DialogBlock, showDialog } = DialogComponent();
  return (
    <>
      <View>
        <TouchableOpacity
          style={[isSelf ? styles.self : styles.others]}
          onLongPress={() => showDialog()}
        >
          <Text>{author}</Text>
          <View onTouchStart={() => console.log(date)}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        </TouchableOpacity>
        <DialogBlock
          title={'Actions'}
          toggleVisible={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
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
