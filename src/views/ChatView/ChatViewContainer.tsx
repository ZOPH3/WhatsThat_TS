/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View } from 'react-native';
import { Appbar, Portal, ProgressBar, Text } from 'react-native-paper';

import { useAuth } from '../../lib/context/auth';
import { useService } from '../../lib/context/services';
import { useMessages } from '../../lib/context/messages';

import MessageInteractions from './services/interactions';

import MessageInput from './components/MessageInput';
import MessageList from './list/MessageList';
import SettingsMenu, { IMenuItem } from '../../components/SettingsMenu';

import styles from '../../styles/GlobalStyle';

// FIXME: Loading from cache for messages is malformed, it loses the .messages property and needs [3] to access the messages

/**
 * TODO: I think using MessageContext and copying the messages from the context is better for performance. Deleting a message from the chat context doesnt update the UI.
 */
function ChatViewContainer() {
  const navigation = useNavigation();
  const { current_user } = useAuth().authState;
  const { chat_id } = useMessages();
  const service = useService(); // Draft Services

  if (!chat_id) throw new Error('Missing context');

  const { messageList, sendMessage, isLoading, onError, fetchMessages } =
    MessageInteractions(chat_id);

  const items: IMenuItem[] = [
    {
      title: 'Refresh',
      onPress: () => fetchMessages(),
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
    fetchMessages();
  }, []);

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
    <>
      <Appbar.Header>
        <Appbar.Content title="Chat" />
        <SettingsMenu items={items} onPress={() => navigation.navigate('ProfileStackNavigator')} />
      </Appbar.Header>
      <View style={styles.container}>
        <Portal.Host>
          <ProgressBar indeterminate visible={isLoading} />
          <SafeAreaView style={{ flex: 10, paddingBottom: 75 }}>
            {!!onError && <Text>{onError}</Text>}
            {!messageList && <Text>No Messages</Text>}
            {!!messageList && <MessageList messages={messageList} />}
          </SafeAreaView>
          <MessageInput onSend={handleSend} onDraft={handleDraft} />
        </Portal.Host>
      </View>
    </>
  );
}

export default ChatViewContainer;
