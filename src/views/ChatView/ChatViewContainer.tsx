/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View } from 'react-native';
import { Portal, ProgressBar, Text } from 'react-native-paper';

import useFetchHook from '../../lib/hooks/useFetchHook';
import { TChatInfo } from '../../lib/context/chats/types';
import { useAuth } from '../../lib/context/auth';
import { useService } from '../../lib/context/services';

import MessageInteractions from './services/interactions';
import MessageList from './list/MessageList';
import MessageInput from './components/MessageInput';
import SettingsMenu, { IMenuItem } from '../../components/SettingsMenu';

import styles from '../../styles/GlobalStyle';

// FIXME: Loading from cache for messages is malformed, it loses the .messages property and needs [3] to access the messages

/**
 * TODO: I think using MessageContext and copying the messages from the context is better for performance. Deleting a message from the chat context doesnt update the UI.
 */
function ChatViewContainer(props: { chat_id: number; title: string; chat: TChatInfo }) {
  const { chat_id, title, chat } = props;

  const navigation = useNavigation();
  const service = useService();
  const { current_user } = useAuth().authState;
  const { dispatchMessages, sendMessage } = MessageInteractions(chat_id);
  // const { chatSummaryList } = useChatContext();

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
          chat_id,
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
  }, [chat_id]);

  const handleSend = (inputValue: string) => {
    if (inputValue !== '') sendMessage(inputValue);
  };

  const handleDraft = (inputValue: string, date: string) => {
    const draft = {
      message: {
        message: inputValue,
        author: current_user,
      },
      chat_id,
      created_at: Date.now(),
      scheduled: date,
      sent: false,
    };
    service.dispatcher.addDraftMessage(draft);
  };

  return (
    <View style={styles.container}>
      <Portal.Host>
        <ProgressBar indeterminate visible={isLoading} />
        <SafeAreaView style={{ flex: 10, paddingBottom: 75 }}>
          {!!onError && <Text>{onError}</Text>}
          {!chat.messages && <Text>No Messages</Text>}
          {!!chat.messages && <MessageList messages={chat.messages} />}
        </SafeAreaView>
        <MessageInput onSend={handleSend} onDraft={handleDraft} />
      </Portal.Host>
    </View>
  );
}

export default ChatViewContainer;
