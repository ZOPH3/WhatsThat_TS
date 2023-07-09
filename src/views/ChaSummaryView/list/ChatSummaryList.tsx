import React from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { TChatSummary } from '../../../lib/types/TSchema';
import ChatSummaryItemWrapper from '../components/ListItemWrapper';

interface IChatSummaryList {
  chatSummary: TChatSummary[];
}

interface IChatSummaryActions {
  delete?: () => void;
  edit?: () => void;
  goTo?: () => void;
}

function ChatSummaryList({ chatSummaryList }) {
  const navigation = useNavigation();

  const actions = (chat_id: number, name: string): IChatSummaryActions => {
    return {
      edit: () =>
        navigation.navigate('EditChatView', {
          chat_id,
          chat_name: name,
        }),
      delete: () => console.log('delete'),
      goTo: () =>
        navigation.navigate('ChatView', {
          chat_id,
          chat_name: name,
        }),
    };
  };

  const sortChatSummary = (chatSummary: TChatSummary[]) => {
    if (!chatSummary) return [];
    chatSummary.sort((a, b) => {
      if (a.last_message && b.last_message) {
        return a.last_message.timestamp - b.last_message.timestamp;
      }
      return 0;
    });

    return chatSummary;
  };

  return (
    <View>
      <SafeAreaView>
        {!!chatSummaryList && (
          <FlatList
            data={chatSummaryList}
            keyExtractor={(item: TChatSummary, index: number) => index.toString()}
            renderItem={(_) => (
              <ChatSummaryItemWrapper
                chatSummary={_.item}
                actions={actions(_.item.chat_id, _.item.name)}
              />
            )}
          />
        )}
      </SafeAreaView>
    </View>
  );
}
export default ChatSummaryList;
