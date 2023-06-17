import { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Snackbar, Text } from 'react-native-paper';

import { useApiContext } from '../../lib/context/ApiContext';
import log from '../../lib/util/LoggerUtil';
import ChatSummaryList from './list/ChatSummaryList';
import ButtonComponent from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/GlobalStyle';

const ChaSummaryView = () => {
  const { useFetch } = useApiContext();
  const navigation = useNavigation();

  navigation.setOptions({
    headerRight: () => (
      <ButtonComponent title={'Refetch'} onPress={() => onFetch()} loading={isLoading} />
    ),
  });

  if (!useFetch) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const [chatSummary, setChatSummary] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [onError, setOnError] = React.useState<string | undefined>(undefined);

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

  useEffect(() => {
    onFetch();
  }, []);

  const Result = () => {
    if (isLoading) return <Text>Loading...</Text>;
    if (onError) return <Text>{onError}</Text>;
    if (!chatSummary) return <Text>No chat summary</Text>;

    if (chatSummary) {
      return (
        <View>
          <ChatSummaryList chatSummary={chatSummary} actions={() => console.log('clicked')} />
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

export default ChaSummaryView;
