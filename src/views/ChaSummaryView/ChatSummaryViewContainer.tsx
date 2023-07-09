import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, ProgressBar, Text } from 'react-native-paper';

import styles from '../../styles/GlobalStyle';

import useFetchHook from '../../lib/hooks/useFetchHook';
import { useChat } from '../../lib/context/chats';

import ChatSummaryList from './list/ChatSummaryList';

/**
 * @description - Contains the api call to get the chat summary list which populates the chat summary list component
 */
function ChatSummaryViewContainer({ reload }) {
  const { chatSummaryList } = useChat();
  const { isLoading, onError } = useFetchHook({ url: '/chat', method: 'GET' }, true);

  return (
    <View style={styles.container}>
      <ProgressBar indeterminate visible={isLoading} />
      <SafeAreaView style={{ flex: 10, marginHorizontal: 15 }}>
        {!!onError && <Text>{onError}</Text>}
        {(!chatSummaryList || !chatSummaryList.length) && (
          <>
            <Text>No Chats</Text>
            <Button onPress={reload}>Refresh?</Button>
          </>
        )}
        {!!chatSummaryList && <ChatSummaryList chatSummaryList={chatSummaryList} />}
      </SafeAreaView>
    </View>
  );
}

export default ChatSummaryViewContainer;
