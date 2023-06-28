import React from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';

import { TChatSummary } from '../../../lib/types/TSchema';
import { useNavigation } from '@react-navigation/native';
import ChatSummaryItemWrapper from '../components/ListItemWrapper';

interface IChatSummaryList {
  chatSummary: TChatSummary[];
}

interface IChatSummaryActions {
  delete?: () => void;
  edit?: () => void;
  goTo?: () => void;
}

const ChatSummaryList = ({ chatSummaryList }) => {
  const navigation = useNavigation();

  const actions = (chat_id: number, name: string): IChatSummaryActions => {
    return {
      edit: () =>
        navigation.navigate('EditChatView', {
          chat_id: chat_id,
          chat_name: name,
        }),
      delete: () => console.log('delete'),
      goTo: () =>
        navigation.navigate('ChatView', {
          chat_id: chat_id,
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

  //FIXME: For some reason, sorting the array here causes undefined function error
  return (
    <View>
      <SafeAreaView>
        <FlatList
          data={chatSummaryList}
          keyExtractor={(item) => item.chat_id.toString()}
          renderItem={(_) => (
            <ChatSummaryItemWrapper
              chatSummary={_.item}
              actions={actions(_.item.chat_id, _.item.name)}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
};
export default ChatSummaryList;
