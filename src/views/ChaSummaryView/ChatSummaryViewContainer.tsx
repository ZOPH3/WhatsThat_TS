import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';

import styles from '../../styles/GlobalStyle';

import useFetchHook from '../../lib/hooks/useFetchHook';
import { useChat } from '../../lib/context/chats';

import ChatSummaryList from './list/ChatSummaryList';

function ChatSummaryViewContainer() {
  const { chatSummaryList } = useChat();

  const { isLoading, onError } = useFetchHook({ url: '/chat', method: 'GET' }, true);

  return (
    <View style={styles.container}>
      <ProgressBar indeterminate visible={isLoading} />
      <SafeAreaView style={{ flex: 10, marginHorizontal: 15 }}>
        {!!onError && <Text>{onError}</Text>}
        {(!chatSummaryList || !chatSummaryList.length) && <Text>No Chats</Text>}
        {!!chatSummaryList && <ChatSummaryList chatSummaryList={chatSummaryList} />}
      </SafeAreaView>
    </View>
  );
}

export default ChatSummaryViewContainer;
