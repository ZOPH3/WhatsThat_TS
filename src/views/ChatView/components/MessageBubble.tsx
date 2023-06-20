import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import DialogComponent from '../../../components/Dialog';
import { List, Text } from 'react-native-paper';

interface IMessageBubble {
  message: string;
  author: string;
  date: string;
  isSelf: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
}

const MessageBubble = ({ message, author, date, isSelf = false }: IMessageBubble) => {
  const { DialogBlock, showDialog } = DialogComponent();

  const content = [
    {
      children: (
        <List.Item
          title="Edit"
          description="Edit your message"
          left={(props) => <List.Icon {...props} icon="folder" />}
          onPress={() => {
            console.log('Edit');
          }}
        />
      ),
    },
    {
      children: (
        <View>
          <Text>Forward</Text>
        </View>
      ),
    },
    {
      children: (
        <View>
          <Text>Delete</Text>
        </View>
      ),
    },
  ];

  //TODO: Add actions for other users
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
        {!isSelf ? <DialogBlock title={'Actions'} content={content} /> : null}
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
