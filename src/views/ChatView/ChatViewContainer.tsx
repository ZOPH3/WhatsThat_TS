import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';
import { Snackbar } from 'react-native-paper';

import SettingsMenu, { IMenuItem } from '../../components/SettingsMenu';
import { styles } from '../../styles/GlobalStyle';
import MessageList from './list/MessageList';
import MessageInput from './components/MessageInput';
import { useApiContext } from '../../lib/context/ApiContext';
import log from '../../lib/util/LoggerUtil';

import { useMessageContext } from '../../lib/context/MessageContext';
import useFetchHook from '../../lib/hooks/useFetchHook';
import { useAuthContext } from '../../lib/context/AuthContext';
import { TChat } from '../../lib/types/TSchema';
import { useNavigation } from '@react-navigation/native';

const ChatViewContainer = (props: { chat_id: number; title: string }) => {
  const navigation = useNavigation();
  const { useFetch } = useApiContext();
  const { authState } = useAuthContext();
  const { messageList, dispatcher } = useMessageContext();

  const { chat_id, title } = props;

  if (!useFetch) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const _CRUD = (data: TChat, setData: React.SetStateAction<any>) => {
    const addMessage = (message: string) => {
      const last_id = getLastMessageId(data.messages);

      const msg = {
        message_id: last_id ? last_id.message_id + 1 : 1,
        timestamp: new Date().toISOString(),
        message: message,
        author: authState.current_user,
      };

      setData({ ...data, messages: [...data.messages, msg] });
    };

    const removeMessage = (message: { id: any }) => {
      setData((prev: any[]) => prev.filter((m) => m.id !== message.id));
    };

    const editMessage = (message: { id: any }) => {
      setData((prev: any[]) => prev.map((m) => (m.id === message.id ? message : m)));
    };

    return { addMessage, removeMessage, editMessage };
  };

  const { data, isLoading, onFetch, onError, setOnError, setData, getCache, getFresh } =
    useFetchHook({ url: `/chat/${chat_id}`, method: 'GET' }, true);

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
    if (!data) return <Text>No Messages</Text>;

    if (messageList.length > 0) {
      return (
        <View>
          <MessageList messages={messageList} />
        </View>
      );
    }
    return <Text>MessageListView</Text>;
  };

  const actions = () => {
    const sendMessage = (message: string) => {
      _CRUD(data, setData).addMessage(message);
    };
    return { sendMessage };
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 10 }}>
        <Result />
      </SafeAreaView>
      <MessageInput actions={actions} />
      <Snackbar visible={onError !== undefined} onDismiss={() => setOnError(undefined)}>
        {onError}
      </Snackbar>
    </View>
  );
};

function getLastMessageId(messageList: any[]) {
  const m = messageList?.sort((a, b) => a.message_id - b.message_id);
  return m?.findLast((message) => message.message_id != null);
}

export default ChatViewContainer;
