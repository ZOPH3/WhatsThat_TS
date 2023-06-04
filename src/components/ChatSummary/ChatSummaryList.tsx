import React, { useRef } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';

import { TChatSummary } from '../../types/TSchema';
import ChatSummaryContainer from './ChatSummaryContainer';

interface IChatSummaryList {
  chatSummary: TChatSummary[];
  actions: any;
}

const ChatSummaryList = ({ chatSummary, actions }: IChatSummaryList) => {
  const flatListRef = useRef<FlatList<TChatSummary>>(null);

  return (
    <View>
      <SafeAreaView>
        <FlatList
          ref={flatListRef}
          data={chatSummary}
          keyExtractor={(item) => item.chat_id.toString()}
          renderItem={(_) => <ChatSummaryContainer chatSummary={_.item} actions={actions} />}
        />
      </SafeAreaView>
    </View>
  );
};

export default ChatSummaryList;
