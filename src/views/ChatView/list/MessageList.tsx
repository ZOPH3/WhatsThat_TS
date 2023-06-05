import React, { useRef } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';

import { styles } from '../../../screens/chat/ChatListScreen.styles';
import { TSingleMessage } from '../../../lib/types/TSchema';
import MessageContainer from '../components/MessageContainer';

interface IMessageList {
  messages: TSingleMessage[];
  actions: any;
}

const MessageList = ({ messages, actions }: IMessageList) => {
  const flatListRef = useRef<FlatList<TSingleMessage>>(null);

  return (
    <View style={styles.containerMain}>
      <SafeAreaView style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.message_id.toString()}
          renderItem={(_) => <MessageContainer message={_.item} actions={actions} />}
        />
      </SafeAreaView>
    </View>
  );
};

export default MessageList;
