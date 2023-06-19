import React from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';

import { TChatSummary } from '../../../lib/types/TSchema';
import ChatSummaryContainer from '../components/ChatSummaryContainer';
import { useNavigation } from '@react-navigation/native';

interface IChatSummaryList {
  chatSummary: TChatSummary[];
}

interface IChatSummaryActions {
  delete?: () => void;
  edit?: () => void;
  goTo?: () => void;
}

const ChatSummaryList = ({ chatSummary }: IChatSummaryList) => {
  const navigation = useNavigation();
  const actions = (chat_id: number, name: string): IChatSummaryActions => {
    return {
      edit: () => console.log('clicked edit', chat_id),
      delete: () => console.log('delete'),
      goTo: () =>
        navigation.navigate('ChatView', 
        { 
          chat_id: chat_id, 
          chat_name: name
        }),
    };
  };

  return (
    <View>
      <SafeAreaView>
        <FlatList
          data={chatSummary}
          keyExtractor={(item) => item.chat_id.toString()}
          renderItem={(_) => (
            <ChatSummaryContainer chatSummary={_.item} actions={actions(_.item.chat_id, _.item.name)} />
          )}
        />
      </SafeAreaView>
    </View>
  );
};

export default ChatSummaryList;
