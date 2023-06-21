import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ProgressBar, Snackbar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { styles } from '../../styles/GlobalStyle';
import log from '../../lib/util/LoggerUtil';

import ChatSummaryList from './list/ChatSummaryList';
import SettingsMenu, { IMenuItem } from '../../components/SettingsMenu';

import { useApiContext } from '../../lib/context/ApiContext';
import useFetchHook from '../../lib/hooks/useFetchHook';
import { useAuthContext } from '../../lib/context/AuthContext';

const ChatSummaryView = () => {
  const { useFetch } = useApiContext();
  const { logout } = useAuthContext();
  const navigation = useNavigation();

  if (!useFetch || !logout) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const { data, isLoading, onFetch, onError, setOnError } = useFetchHook(
    { url: '/chat', method: 'GET' },
    true
  );

  const items: IMenuItem[] = [
    {
      title: 'Settings',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      title: 'Reload',
      onPress: () => onFetch(),
    },
    {
      title: 'Logout',
      onPress: () => logout(),
      disabled: false,
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerRight: () => <SettingsMenu items={items} />,
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
