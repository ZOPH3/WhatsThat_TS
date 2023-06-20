import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, ProgressBar, Text } from 'react-native-paper';
import { Snackbar } from 'react-native-paper';

import ButtonComponent from '../../components/Button';
import SettingsMenu, { IMenuItem } from '../../components/SettingsMenu';
import { styles } from '../../styles/GlobalStyle';
import MessageList from './list/MessageList';
import MessageInput from './components/MessageInput';
import { useApiContext } from '../../lib/context/ApiContext';
import log from '../../lib/util/LoggerUtil';
import useFetchHook from '../../lib/hooks/useFetchHook';
import { TChat } from '../../lib/types/TSchema';
import { MessageProvider } from '../../lib/context/MessageContext';

const ChatView = ({ navigation, route }) => {
  const { useFetch } = useApiContext();

  if (!useFetch) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const items: IMenuItem[] = [
    {
      title: 'Refresh',
      onPress: () => onFetch(),
    },
    {
      title: 'Invite user',
      onPress: () => navigation.navigate('InviteUserView'),
    },
    {
      title: 'Edit Chat',
      onPress: () => navigation.navigate('EditChatView'),
      disabled: true,
    },
  ];

  const {
    data,
    isLoading,
    onFetch,
    onError,
    setOnError,
  }: { data: TChat; isLoading: any; onFetch: any; onError: any; setOnError: any } = useFetchHook(
    { url: `/chat/${route.params.chat_id}`, method: 'GET' },
    true
  );

  useEffect(() => {
    navigation.setOptions({
      title: `${route.params.chat_name}`,
      headerRight: () => (
        <>
          <ButtonComponent
            title={'Edit'}
            onPress={() => onFetch()}
            loading={isLoading}
            disabled={true}
          />
          <SettingsMenu items={items} />
        </>
      ),
    });
    onFetch();
  }, []);

  const Result = () => {
    if (isLoading) return <ProgressBar indeterminate={true} visible={isLoading} />;
    if (onError) return <Text>{onError}</Text>;
    if (!data) return <Text>No Messages</Text>;

    if (data) {
      return (
        <View>
          <MessageList messages={data.messages} />
        </View>
      );
    }
    return <Text>MessageListView</Text>;
  };

  return (
    <MessageProvider>
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 10 }}>
          <Result />
        </SafeAreaView>
        <MessageInput />
        <Snackbar visible={onError !== undefined} onDismiss={() => setOnError(undefined)}>
          {onError}
        </Snackbar>
      </View>
    </MessageProvider>
  );
};

const _CRUD = (setMessageList: React.SetStateAction<any>) => {
  const addMessage = (message: any) => {
    setMessageList((prev: any) => [...prev, message]);
  };

  const removeMessage = (message: { id: any }) => {
    setMessageList((prev: any[]) => prev.filter((m) => m.id !== message.id));
  };

  const editMessage = (message: { id: any }) => {
    setMessageList((prev: any[]) => prev.map((m) => (m.id === message.id ? message : m)));
  };
};

export default ChatView;
