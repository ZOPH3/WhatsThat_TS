import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';
import { AxiosError } from 'axios';
import { Snackbar } from 'react-native-paper';

import ButtonComponent from '../../components/Button';
import SettingsMenu, { IMenuItem } from '../../components/SettingsMenu';
import { styles } from '../../styles/GlobalStyle';
import MessageList from './list/MessageList';
import MessageInput from './components/MessageInput';
import { useApiContext } from '../../lib/context/ApiContext';
import log from '../../lib/util/LoggerUtil';

const ChatView = ({ navigation, route }) => {
  const { useFetch } = useApiContext();

  if (!useFetch) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const [messageList, setMessageList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [onError, setOnError] = React.useState<string | undefined>(undefined);

  const items: IMenuItem[] = [
    {
      title: 'Refresh',
      onPress: () => onFetch(),
    },
    {
      title: 'Settings',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      title: 'About',
      onPress: () => navigation.navigate('About'),
    },
  ];

  const onFetch = async () => {
    /**
     * Fetch
     */
    setOnError(undefined);
    setMessageList([]);
    setIsLoading(true);

    const data = await useFetch(
      { url: `/chat/${route.params.chat_id}`, method: 'GET' },
      true,
      setIsLoading
    ).catch((err: AxiosError) => {
      const msg = err.request?.response
        ? err.request.response
        : 'Timeout: It took more than 5 seconds to get the result!!';
      setOnError(msg);
    });

    if (data) {
      setMessageList(data.messages);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: `${route.params.chat_name}`,
      headerRight: () => (
        <>
          <ButtonComponent title={'Refresh'} onPress={() => onFetch()} loading={isLoading} />
          <SettingsMenu items={items} />
        </>
      ),
    });
    onFetch();
  }, []);

  const Result = () => {
    if (isLoading) return <ProgressBar indeterminate={true} visible={isLoading} />;
    if (onError) return <Text>{onError}</Text>;
    if (!messageList) return <Text>No Messages</Text>;

    if (messageList) {
      return (
        <View>
          <MessageList messages={messageList} />
        </View>
      );
    }
    return <Text>MessageListView</Text>;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 10 }}>
        <Result />
      </SafeAreaView>
      <MessageInput />
      <Snackbar visible={onError !== undefined} onDismiss={() => setOnError(undefined)}>
        {onError}
      </Snackbar>
    </View>
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
