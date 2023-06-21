import React, { useRef } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';

import { TSingleMessage } from '../../../lib/types/TSchema';
import MessageContainer from '../components/MessageContainer';
import { styles } from '../../../styles/GlobalStyle';
import { useMessageContext } from '../../../lib/context/MessageContext';

interface IMessageList {
  messages: TSingleMessage[];
}

export interface IMessageActions {
  delete: () => void;
  edit: () => void;
  goTo?: () => void;
}

const MessageList = ({ messages }: IMessageList) => {
  const { dispatcher } = useMessageContext();
  const flatListRef = useRef<FlatList<TSingleMessage>>(null);

  //TODO: context is not working
  const actions = (message_id: number, chat_id: number): IMessageActions => {
    return {
      edit: () => dispatcher.editMessage(chat_id, message_id),
      delete: () => dispatcher.deleteMessage(chat_id, message_id),
    };
  };

  return (
    <View style={styles.containerMain}>
      <SafeAreaView style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages ? messages.sort((a, b) => a.timestamp - b.timestamp) : []}
          keyExtractor={(item) => item.message_id.toString()}
          renderItem={(_) => <MessageContainer message={_.item} />}
        />
      </SafeAreaView>
    </View>
  );
};

export default MessageList;
