import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { styles } from '../../styles/GlobalStyle';

import SettingsMenu, { IMenuItem } from '../../components/SettingsMenu';
import MessageList from './list/MessageList';
import MessageInput from './components/MessageInput';

import { useMessageContext } from '../../lib/context/MessageContext';
import { useAuthContext } from '../../lib/context/AuthContext';
import useFetchHook from '../../lib/hooks/useFetchHook';

import { TSingleMessage } from '../../lib/types/TSchema';
import { useApiContext } from '../../lib/context/ApiContext';

const ChatViewContainer = (props: { chat_id: number; title: string }) => {
  const { chat_id, title } = props;
  const navigation = useNavigation();
  const { authState } = useAuthContext();
  const { messageList, dispatcher } = useMessageContext();
  const {useFetch} = useApiContext();
  const { isLoading, onFetch, onError, getFresh } = useFetchHook(
    { url: `/chat/${chat_id}`, method: 'GET' },
    true
  );

  if (!dispatcher) return <Text>ChatViewContainer</Text>;

  const items: IMenuItem[] = [
    {
      title: 'Refresh',
      onPress: () => onFetch(async () => await getFresh()),
    },
    {
      title: 'Invite user',
      onPress: () => navigation.navigate('InviteUserView'),
      disabled: true,
    },
    {
      title: 'Edit Chat',
      onPress: () => navigation.navigate('EditChatView'),
      disabled: true,
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      title: `${title}`,
      headerRight: () => <SettingsMenu items={items} />,
    });
    onFetch(async () => await getFresh()).then((data) => {
      dispatcher.setMessages(data.messages);
    });
  }, []);

  const Result = () => {
    if (isLoading) return <ProgressBar indeterminate={true} visible={isLoading} />;
    if (onError) return <Text>{onError}</Text>;
    if (!messageList) return <Text>No Messages</Text>;

    if (messageList.length > 0) {
      return (
        <View>
          <MessageList messages={messageList} />
        </View>
      );
    }
    return <Text>MessageListView</Text>;
  };

  const sendMessage = (message: string) => {

    if (authState.current_user == null) {
      console.log('no user logged in')
      return;
    }
    const last_id = messageList.length > 0 ? getLastMessageId(messageList) : 0;
    dispatcher.sendMessage({
      message_id: last_id + 1,
      timestamp: Date.now(),
      message: message,
      author: authState.current_user,
    });
  };

  const deleteMessage = (id: number) => {
    dispatcher.deleteMessage(id);
  };

  const updateMessage = (message: TSingleMessage) => {
    dispatcher.updateMessage(message);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 10 }}>
        <Result />
      </SafeAreaView>
      <MessageInput send={sendMessage} />
    </View>
  );
};

function getLastMessageId(messageList: any[]) {
  const m = messageList?.sort((a, b) => a.message_id - b.message_id);
  return m?.findLast((message) => message.message_id != null).message_id;
}

export default ChatViewContainer;
