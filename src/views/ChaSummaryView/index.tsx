import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Button, ProgressBar, Snackbar, Text } from 'react-native-paper';

import { useApiContext } from '../../lib/context/ApiContext';
import log from '../../lib/util/LoggerUtil';
import ChatSummaryList from './list/ChatSummaryList';
import ButtonComponent from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/GlobalStyle';
import SettingsMenu, { IMenuItem } from '../../components/SettingsMenu';
import { useChatListContext } from '../../lib/context/ChatListContext';
import chatListMutations from './services/fetch';

const ChatSummaryView = () => {
  const { useFetch } = useApiContext();
  const navigation = useNavigation();

  const chatListContext = useChatListContext();
  const { state, dispatcher } = chatListContext;

  if (!useFetch) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const items: IMenuItem[] = [
    {
      title: 'Settings',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      title: 'About',
      onPress: () => navigation.navigate('About'),
    },
  ]

  const {data, isLoading, onFetch, onError, setOnError} = chatListMutations();

  // TODO: Change where is loading is given to a ref as it does not work in the use effect like this
  useEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerRight: () => (
        <>
          <ButtonComponent title={'Refetch'} onPress={() => onFetch()} loading={isLoading} />
          <SettingsMenu items={items}/>
        </>
      ),
    });
    onFetch();
    
  }, []);

  const Result = () => {
    if (isLoading) return <ProgressBar indeterminate={true} visible={isLoading} />;
    if (onError) return <Text>{onError}</Text>;
    if (!data) return <Text>No chat summary</Text>;

    if (data) {
      return (
        <View>
          <ChatSummaryList chatSummary={data} />
        </View>
      );
    }
    return <Text>ChaSummaryView</Text>;
  };

  return (
    <View style={styles.container}>
      <Button onPress={() => dispatcher.print()}>Chat</Button>
      <Button onPress={() => dispatcher.deleteChatRoom(1)}>set</Button>
      <Result />
      <Snackbar visible={onError !== undefined} onDismiss={() => setOnError(undefined)}>
        {onError}
      </Snackbar>
    </View>
  );
};

export default ChatSummaryView;
