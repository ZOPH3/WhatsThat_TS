import { View, SafeAreaView, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Button } from '@react-native-material/core';
import { styles } from './ChatListScreen.styles';
import IsLoadingIndicator from '../../components/utils/LoadingIndicator';
import { TChatSummary } from '../../types/TSchema';
import useQuery from '../../hooks/UseQueryHook';
import ChatController from '../../controllers/ChatController';
import ListItemComponent from '../../components/chat/ChatSummaryComponent';
import { useApiContext } from '../../context/ApiContext';
import log from '../../util/LoggerUtil';

//FIXME: This needs to be moved to context which is used to watch if a chat is updated too from user message?
function HomeScreen() {
  const { authApi } = useApiContext();
  const [chatList, setChatList] = useState<TChatSummary[]>();

  const { data, isLoading, isSuccess, isError, refetch } = useQuery<TChatSummary[]>(
    async () => ChatController().fetchChatList(authApi),
    {
      onSuccess(data) {
        setChatList(data);
      },
      onError(error) {
        console.log(error);
      },
    }
  );

  // async function fetch(){
  //   let error = undefined;
  //   console.log(process.version)

  //   try {
  //     if (!authApi) {
  //       throw new Error('Unable to find Auth API');
  //     }

  //     const response = authApi
  //       .get('/chat', {
  //         signal: AbortSignal.timeout(5000)
  //       })
  //       .then(
  //         (res) => res,
  //         (err) => {
  //           error = err;
  //           log.error(err.response);
  //         }
  //       );


  //     if (error) {
  //       throw new Error('Failed to fetch chat list');
  //     }

  //     if (response == undefined) {
  //       throw new Error('No data found');
  //     }

  //     log.debug('Fetch Response: ', response);
  //     // return response;
  //   } catch (err) {
  //     log.error(err);
  //   }
    
  // }
  // useEffect(() => {
  //   fetch();
  // },[])


  function filterChatListByTime(list: TChatSummary[]) {
    return list.filter((c) => c.last_message.timestamp !== undefined);
  }
  function getOnlyUndefined(list: TChatSummary[]) {
    return list.filter((c) => c.last_message.timestamp === undefined);
  }
  function sortByDateTime(list: TChatSummary[]) {
    return filterChatListByTime(list).sort(function (a, b) {
      return b.last_message.timestamp - a.last_message.timestamp;
    });
  }

  return (
    <>
      <View style={styles.containerMain}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>{
          // render()
          }</ScrollView>
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
