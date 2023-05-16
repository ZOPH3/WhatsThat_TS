import { View, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import ChatService from '../../services/chat.services';
import { Button } from '@react-native-material/core';
import ChatListHomeComponent from '../../components/chat/chatSummary.list.component';
import { styles } from './ChatListScreen.styles';
import IsLoadingIndicator from '../../components/utils/isLoadingIndicator.component';
import { ChatSummary } from '../../types/api.schema.types';

//FIXME: This needs to be moved to context which is used to watch if a chat is updated too from user message?
function HomeScreen() {
  const [chatList, setChatList] = useState<ChatSummary[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    async function handleFetchChat() {
      try {
        const response = await ChatService.fetchChatList();

        if (!response) {
          throw new Error('Unable to fetch chat list...');
        }
        const sortedChatList = sortByDateTime(response);
        setChatList(sortedChatList);
        setIsSuccess(true);

        // sortedChatList.forEach(element => {
        //   console.log(element.last_message.timestamp)
        // });

      } catch (err) {
        console.log(err);
      }
    }

    handleFetchChat().finally(() => {
      setIsLoading(false);
    });
  }, []);

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
    if (isSuccess && chatList) {
      return (
        <>
          <View style={styles.containerMain}>
            <SafeAreaView style={styles.container}>
              <ScrollView style={styles.scrollView}>
                <View>{ChatListHomeComponent(chatList)}</View>
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
              console.log(chatList);
            }}
          />
        </>
      );
    }
  }
}

export default HomeScreen;
