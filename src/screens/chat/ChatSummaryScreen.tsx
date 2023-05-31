import { View, SafeAreaView, ScrollView, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from '@react-native-material/core';
import { styles } from './ChatListScreen.styles';
import IsLoadingIndicator from '../../components/utils/LoadingIndicator';
import { ChatSummary } from '../../types/TSchema';
import useQuery from '../../hooks/UseQueryHook';
import ChatController from '../../controllers/ChatController';
import ListItemComponent from '../../components/chat/ChatSummaryComponent';

//FIXME: This needs to be moved to context which is used to watch if a chat is updated too from user message?
function HomeScreen() {
  const [chatList, setChatList] = useState<ChatSummary[]>();

  const { data, isLoading, isSuccess, isError, refetch } = useQuery<ChatSummary[]>(
    () => ChatController.fetchChatList(),
    {
      onSuccess(data) {
        setChatList(data);
      },
      onError(error) {
        console.log('IM ERRRRRRRR');
      },
    }
  );

  function filterChatListByTime(list: ChatSummary[]) {
    return list.filter((c) => c.last_message.timestamp !== undefined);
  }
  function getOnlyUndefined(list: ChatSummary[]) {
    return list.filter((c) => c.last_message.timestamp === undefined);
  }
  function sortByDateTime(list: ChatSummary[]) {
    return filterChatListByTime(list).sort(function (a, b) {
      return b.last_message.timestamp - a.last_message.timestamp;
    });
  }

  return (
    <>
      <View style={styles.containerMain}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>{render()}</ScrollView>
        </SafeAreaView>
      </View>
    </>
  );

  function render() {
    if (isLoading) return <IsLoadingIndicator />;
    if (chatList) {
      return (
        <>
          <View style={styles.containerMain}>
            <SafeAreaView style={styles.container}>
              <ScrollView style={styles.scrollView}>
                <View>
                  {chatList.map((chat) => {
                    return (
                      <Pressable key={chat.chat_id}>
                        <ListItemComponent key={chat.chat_id} chatSummary={chat} />
                      </Pressable>
                    );
                  })}
                </View>
              </ScrollView>
            </SafeAreaView>
          </View>
        </>
      );
    } else {
      return (
        <>
          <Button title="Y" onPress={() => console.log('fsdfsdf')} />
        </>
      );
    }
  }
}

export default HomeScreen;
