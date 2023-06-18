import React from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';

import { TChatSummary } from '../../../lib/types/TSchema';
import ChatSummaryContainer from '../components/ChatSummaryContainer';

interface IChatSummaryList {
  chatSummary: TChatSummary[];
}

const ChatSummaryList = ({ chatSummary }: IChatSummaryList) => {
  return (
    <View>
      <SafeAreaView>
        <FlatList
          data={chatSummary}
          keyExtractor={(item) => item.chat_id.toString()}
          renderItem={(_) => (
            <ChatSummaryContainer
              chatSummary={_.item}
              actions={{
                edit: () => console.log('clicked edit', _.item.chat_id),
                delete: () => console.log('delete'),
              }}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
};

export default ChatSummaryList;
