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
  const [messageList, setMessageList] = useState<ChatSummary[]>([]);

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

        setMessageList(sortByDateTime(response));
        setIsSuccess(true);
      } catch (err) {
        console.log(err);
      }
    }

    handleFetchChat().finally(() => {
      setIsLoading(false);
    });
  }, []);

  function sortByDateTime(list: ChatSummary[]) {
    return list.sort(function (a, b) {
      return (
        new Date(b.last_message.timestamp).valueOf() - new Date(a.last_message.timestamp).valueOf()
      );
    });
  }

  if (isLoading) {
    return <IsLoadingIndicator />;
  } else {
    if (isSuccess && messageList) {
      return (
        <>
          <View style={styles.containerMain}>
            <SafeAreaView style={styles.container}>
              <ScrollView style={styles.scrollView}>
                <View>{ChatListHomeComponent(messageList)}</View>
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
              console.log(messageList);
            }}
          />
        </>
      );
    }
  }
}

export default HomeScreen;
