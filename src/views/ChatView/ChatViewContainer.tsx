/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import styles from '../../styles/GlobalStyle';

import SettingsMenu, { IMenuItem } from '../../components/SettingsMenu';
import MessageList from './list/MessageList';
import MessageInput from './components/MessageInput';
import useFetchHook from '../../lib/hooks/useFetchHook';
import MessageInteractions from './services/interactions';

// FIXME: Loading from cache for messages is malformed, it loses the .messages property and needs [3] to access the messages

/**
 * TODO: Need to set the state of the messages
 */
function ChatViewContainer(props: { chat_id: number; title: string }) {
  const { chat_id, title } = props;
  const navigation = useNavigation();
  const { messageList, dispatchMessages, sendMessage } = MessageInteractions(chat_id);

  const { isLoading, onFetch, onError, getFresh, fetchCacheorFresh } = useFetchHook(
    { url: `/chat/${chat_id}`, method: 'GET' },
    true
  );

  const items: IMenuItem[] = [
    {
      title: 'Refresh',
      onPress: () => {
        onFetch(async () => getFresh()).then((res) => {
          if (res) {
            dispatchMessages(res.messages);
          } else {
            fetchCacheorFresh().then((res) => {
              if (res) {
                dispatchMessages(res.messages);
              }
            });
          }
        });
      },
    },
    {
      title: 'Invite user',
      onPress: () => navigation.navigate('InviteUserView'),
      disabled: true,
    },
    {
      title: 'Edit Chat',
      onPress: () =>
        navigation.navigate('EditChatView', {
          chat_id: chat_id,
        }),
      disabled: false,
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      title: `${title}`,
      headerRight: () => <SettingsMenu items={items} />,
    });
    onFetch(async () => getFresh()).then((data) => {
      if (!data) return;
      dispatchMessages(data.messages);
    });
  }, []);

  const handleSend = (inputValue: string) => {
    // Do something with the input value, such as sending it to a server
    if (inputValue !== '') sendMessage(inputValue);
  };

  return (
    <View style={styles.container}>
      <ProgressBar indeterminate visible={isLoading} />
      <SafeAreaView style={{ flex: 10, paddingBottom: 75 }}>
        {onError ? (
          <Text>{onError}</Text>
        ) : messageList ? (
          <MessageList messages={messageList} />
        ) : (
          <Text>No Messages</Text>
        )}
      </SafeAreaView>
      <MessageInput onSend={handleSend} />
    </View>
  );
}

export default ChatViewContainer;
