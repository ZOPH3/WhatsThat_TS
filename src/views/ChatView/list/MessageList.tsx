import React, { useRef } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';

import { TSingleMessage } from '../../../lib/types/TSchema';
import MessageContainer from '../components/MessageContainer';
import styles from '../../../styles/GlobalStyle';

interface IMessageList {
  messages: TSingleMessage[];
}

function MessageList({ messages }: IMessageList) {
  const flatListRef = useRef<FlatList<TSingleMessage>>(null);
  if (!messages || messages.length === 0) return null;

  return (
    <View style={styles.containerMain}>
      <SafeAreaView style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages ? messages.sort((a, b) => a.timestamp - b.timestamp) : []}
          keyExtractor={(item) => item.timestamp.toString()}
          renderItem={({ item }) => <MessageContainer message={item} />}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        />
      </SafeAreaView>
    </View>
  );
}

export default MessageList;
