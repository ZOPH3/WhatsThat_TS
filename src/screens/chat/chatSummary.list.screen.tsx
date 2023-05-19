import { View, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import ChatService from '../../services/chat.services';
import { Button } from '@react-native-material/core';
import ChatListHomeComponent from '../../components/chat/chatSummary.list.component';
import { styles } from './ChatListScreen.styles';
import IsLoadingIndicator from '../../components/utils/isLoadingIndicator.component';
import { ChatSummary } from '../../types/api.schema.types';
import useQuery from '../../hooks/useQuery';

//FIXME: This needs to be moved to context which is used to watch if a chat is updated too from user message?
function HomeScreen() {
  const {
    data,
    isLoading,
    isSuccess,
    error,
    refetch
  } = useQuery<ChatSummary[]>(() => ChatService.fetchChatList());

  function filterChatListByTime(list: ChatSummary[]){
    return list.filter((c) => c.last_message.timestamp !== undefined);
  }
  function getOnlyUndefined(list: ChatSummary[]) {
    return list.filter((c) => c.last_message.timestamp === undefined);
  }
  function sortByDateTime(list: ChatSummary[]) {
    return filterChatListByTime(list).sort(function (a, b) {
      return (
        b.last_message.timestamp - a.last_message.timestamp
      );
    });
  }

  if (isLoading) {
    return <IsLoadingIndicator />;
  } else {
    if (isSuccess && data) {
      return (
        <>
          <View style={styles.containerMain}>
            <SafeAreaView style={styles.container}>
              <ScrollView style={styles.scrollView}>
                <View>{ChatListHomeComponent(data)}</View>
              </ScrollView>
            </SafeAreaView>
          </View>
        </>
      );
    } else {
      return (
        <>
          <Button
            title="Y"
            onPress={() => {
              console.log(data);
            }}
          />
        </>
      );
    }
  }
}

export default HomeScreen;
