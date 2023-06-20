import React from 'react';
import { TSingleMessage } from '../../../lib/types/TSchema';
// import MessageBubble from './MessageBubble';
import { useAuthContext } from '../../../lib/context/AuthContext';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { List, Text } from 'react-native-paper';
import DialogComponent from '../../../components/Dialog';
// import { styles } from '../../../styles/GlobalStyle';

interface IMessageContainer {
  message: TSingleMessage;
}

const MessageContainer = ({ message }: IMessageContainer) => {
  const currentUser = useAuthContext().authState.user_id;
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

  const isToday = (date: Date) => {
    const now = new Date();

    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  };
  const isSelf = message.author.user_id === currentUser;
  const date = new Date(message.timestamp);
  const author = isSelf ? 'Me' : `${message.author.first_name} ${message.author.last_name}`;

  return (
    // <MessageBubble
    //   message={message.message}
    //   author={author}
    //   date={isToday(date) ? date.toLocaleTimeString() : date.toLocaleString()}
    //   isSelf={isSelf}
    // />
    <View>
      <TouchableOpacity
        style={[isSelf ? styles.self : styles.others]}
        onLongPress={() => showDialog()}
      >
        <Text>{author}</Text>
        <View onTouchStart={() => console.log(date)}>
          <Text style={styles.date}>
            {isToday(date) ? date.toLocaleTimeString() : date.toLocaleString()}
          </Text>
          <Text style={styles.messageText}>{message.message}</Text>
        </View>
      </TouchableOpacity>
      {!isSelf ? <DialogBlock title={'Actions'} content={content} /> : null}
    </View>
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

export default MessageContainer;
