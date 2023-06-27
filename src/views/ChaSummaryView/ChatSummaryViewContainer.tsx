import React, { useEffect, useRef } from 'react';
import { SafeAreaView, View } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { styles } from '../../styles/GlobalStyle';

import ButtonComponent from '../../components/Button';

import ChatSummaryList from './list/ChatSummaryList';
import SettingsMenu, { IMenuItem } from '../../components/SettingsMenu';
import CreateChatDialog from './components/Dialog';

import useFetchHook from '../../lib/hooks/useFetchHook';
import { useAuthContext } from '../../lib/context/AuthContext';
import { useChatContext } from '../../lib/context/ChatContext';

const ChatSummaryViewContainer = () => {
  // const navigation = useNavigation();
  // const { logout } = useAuthContext();
  const { chatSummaryList, dispatcher } = useChatContext();

  // const dialogRef = useRef<{ show: () => void }>();

  const { isLoading, onError, onFetch, getFresh, fetchCacheorFresh } = useFetchHook(
    { url: '/chat', method: 'GET' },
    true
  );

  // const items: IMenuItem[] = [
  //   {
  //     title: 'Settings',
  //     onPress: () => navigation.navigate('Settings'),
  //   },
  //   {
  //     title: 'Reload',
  //     onPress: () => {
  //       onFetch(async () => await getFresh()).then((res) => {
  //         if (res) {
  //           dispatcher.setChatSummaryList(res);
  //         } else {
  //           fetchCacheorFresh().then((res) => {
  //             if (res) {
  //               dispatcher.setChatSummaryList(res);
  //             }
  //           });
  //         }
  //       });
  //     },
  //   },
  //   {
  //     title: 'Logout',
  //     onPress: () => (logout ? logout() : () => console.log('Unable to find Auth API...')),
  //     disabled: false,
  //   },
  // ];

  useEffect(() => {
    // navigation.setOptions({
    //   headerRight: () => (
    //     <>
    //       <ButtonComponent
    //         title={'Create'}
    //         onPress={() => {
    //           if (dialogRef && dialogRef.current) dialogRef.current.show();
    //         }}
    //       />
    //       <SettingsMenu items={items} />
    //     </>
    //   ),
    // });

    fetchCacheorFresh().then((res) => {
      if (res) {
        dispatcher.setChatSummaryList(res);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <ProgressBar indeterminate={true} visible={isLoading} />
      {/* <CreateChatDialog ref={dialogRef} /> */}

      <SafeAreaView style={{ flex: 10 }}>
        {onError ? (
          <Text>{onError}</Text>
        ) : chatSummaryList.length > 0 ? (
          <ChatSummaryList chatSummaryList={chatSummaryList} />
        ) : (
          <Text>No Chat</Text>
        )}
      </SafeAreaView>
    </View>
  );
};

export default ChatSummaryViewContainer;
