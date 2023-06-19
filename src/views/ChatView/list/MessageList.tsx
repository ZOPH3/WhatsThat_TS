import React, { useRef } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';

import { TSingleMessage } from '../../../lib/types/TSchema';
import MessageContainer from '../components/MessageContainer';
import { styles } from '../../../styles/GlobalStyle';

interface IMessageList {
  messages: TSingleMessage[];
}

interface IMessageActions {
  delete?: () => void;
  edit?: () => void;
  goTo?: () => void;
}

const MessageList = ({ messages }: IMessageList) => {
  const flatListRef = useRef<FlatList<TSingleMessage>>(null);

  const actions = (message_id: number): IMessageActions => {
    return {
      edit: () => console.log('clicked edit', message_id),
      delete: () => console.log('delete'),
      goTo: () => console.log('goTo'),
    };
  };

  return (
    <View style={styles.containerMain}>
      <SafeAreaView style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.message_id.toString()}
          renderItem={(_) => (
            <MessageContainer message={_.item} actions={actions(_.item.message_id)} />
          )}
        />
      </SafeAreaView>
    </View>
  );
};

export default MessageList;
