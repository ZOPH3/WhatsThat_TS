import React from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';

import { TChatSummary } from '../../types/TSchema';
import ChatSummaryContainer from './ChatSummaryContainer';

interface IChatSummaryList {
  chatSummary: TChatSummary[];
  actions: any;
}

const ChatSummaryList = ({ chatSummary, actions }: IChatSummaryList) => {
  return (
    <View>
      <SafeAreaView>
        <FlatList
          data={chatSummary}
          keyExtractor={(item) => item.chat_id.toString()}
          renderItem={(_) => <ChatSummaryContainer chatSummary={_.item} actions={actions} />}
        />
      </SafeAreaView>
    </View>
  );
};

export default ChatSummaryList;
