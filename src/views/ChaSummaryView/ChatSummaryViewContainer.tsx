import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';

import styles from '../../styles/GlobalStyle';

import ChatSummaryList from './list/ChatSummaryList';

import useFetchHook from '../../lib/hooks/useFetchHook';
import { useChatContext } from '../../lib/context/ChatContext';
import { useApiContext } from '../../lib/context/ApiContext';

function ChatSummaryViewContainer() {
  const { chatSummaryList } = useChatContext();

  const { useFetch } = useApiContext();
  if (!useFetch) throw new Error('useFetch is null');

  const { isLoading, onError } = useFetchHook({ url: '/chat', method: 'GET' }, true);

  return (
    <View style={styles.container}>
      <ProgressBar indeterminate visible={isLoading} />
      <SafeAreaView style={{ flex: 10 }}>
        {!!onError && <Text>{onError}</Text>}
        {(!chatSummaryList || !chatSummaryList.length) && <Text>No Chats</Text>}
        {!!chatSummaryList && <ChatSummaryList chatSummaryList={chatSummaryList} />}
      </SafeAreaView>
    </View>
  );
}

export default ChatSummaryViewContainer;
