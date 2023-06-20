import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ProgressBar, Snackbar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { styles } from '../../styles/GlobalStyle';
import log from '../../lib/util/LoggerUtil';

import ChatSummaryList from './list/ChatSummaryList';
import ButtonComponent from '../../components/Button';
import SettingsMenu, { IMenuItem } from '../../components/SettingsMenu';

import { useApiContext } from '../../lib/context/ApiContext';
import useFetchHook from '../../lib/hooks/useFetchHook';

const ChatSummaryView = () => {
  const { useFetch } = useApiContext();
  const navigation = useNavigation();

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
  ];

  const { data, isLoading, onFetch, onError, setOnError } = useFetchHook(
    { url: '/chat', method: 'GET' },
    true
  );

  useEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerRight: () => (
        <>
          <ButtonComponent title={'Refetch'} onPress={() => onFetch()} loading={isLoading} />
          <SettingsMenu items={items} />
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
      <Result />
      <Snackbar visible={onError !== undefined} onDismiss={() => setOnError(undefined)}>
        {onError}
      </Snackbar>
    </View>
  );
};

export default ChatSummaryView;
