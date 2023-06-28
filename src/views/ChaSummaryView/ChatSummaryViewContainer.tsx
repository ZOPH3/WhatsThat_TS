import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';

import { styles } from '../../styles/GlobalStyle';

import ChatSummaryList from './list/ChatSummaryList';

import useFetchHook from '../../lib/hooks/useFetchHook';
import { useChatContext } from '../../lib/context/ChatContext';

const ChatSummaryViewContainer = () => {
  const { chatSummaryList, dispatcher } = useChatContext();

  const { isLoading, onError, fetchCacheorFresh } = useFetchHook(
    { url: '/chat', method: 'GET' },
    true
  );

  useEffect(() => {
    fetchCacheorFresh().then((res) => {
      if (res) {
        dispatcher.setChatSummaryList(res);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <ProgressBar indeterminate={true} visible={isLoading} />
      <SafeAreaView style={{ flex: 10 }}>
        {onError ? (
          <Text>{onError}</Text>
        ) : chatSummaryList.length > 0 ? (
          <ChatSummaryList chatSummaryList={chatSummaryList} />
        ) : (
          <Text>No Chat</Text>
        )}
      </SafeAreaView>
    </View>
  );
};

export default ChatSummaryViewContainer;
