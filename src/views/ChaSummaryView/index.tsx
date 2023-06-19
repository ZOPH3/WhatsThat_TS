import { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ProgressBar, Snackbar, Text } from 'react-native-paper';

import { useApiContext } from '../../lib/context/ApiContext';
import log from '../../lib/util/LoggerUtil';
import ChatSummaryList from './list/ChatSummaryList';
import ButtonComponent from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/GlobalStyle';
import SettingsMenu, { IMenuItem } from '../../components/SettingsMenu';

const ChatSummaryView = () => {
  const { useFetch } = useApiContext();
  const navigation = useNavigation();

  if (!useFetch) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const [chatSummary, setChatSummary] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [onError, setOnError] = React.useState<string | undefined>(undefined);

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

  const onFetch = async () => {
    /**
     * Fetch
     */
    setOnError(undefined);
    setChatSummary([]);
    setIsLoading(true);

    const data = await useFetch({ url: '/chat', method: 'GET' }, true, setIsLoading).catch(
      (err: AxiosError) => {
        const msg = err.request?.response
          ? err.request.response
          : 'Timeout: It took more than 5 seconds to get the result!!';
        setOnError(msg);
      }
    );

    if (data) {
      setChatSummary(data);
    }
  };

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
    if (!chatSummary) return <Text>No chat summary</Text>;

    if (chatSummary) {
      return (
        <View>
          <ChatSummaryList chatSummary={chatSummary} />
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
