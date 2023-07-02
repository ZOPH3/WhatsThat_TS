import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import ButtonComponent from '../../components/Button';
import SettingsMenu, { IMenuItem } from '../../components/SettingsMenu';
import { useAuthContext } from '../../lib/context/AuthContext';
import CreateChatDialog from './components/Dialog';
import useFetchHook from '../../lib/hooks/useFetchHook';
import { useChatContext } from '../../lib/context/ChatContext';
import ChatSummaryViewContainer from './ChatSummaryViewContainer';
import { Button } from 'react-native-paper';
import log from '../../lib/util/LoggerUtil';
import useChatController from '../../lib/controller/ChatController';

function ChatSummaryView() {
  const navigation = useNavigation();
  const { logout } = useAuthContext();
  const { chatSummaryList, dispatcher } = useChatContext();
  const dialogRef = useRef<{ show: () => void }>();
  const { fetchChatDetails, fetchChatSummary } = useChatController();
  // const { onFetch, getFresh, fetchCacheorFresh } = useFetchHook(
  //   { url: '/chat', method: 'GET' },
  //   true
  // );

  // Issue with re rendering closing the keyboard -> dispatcher function seems to be the issue as context is updated, forcing a re render

  const items: IMenuItem[] = [
    {
      title: 'Settings',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      title: 'Reload',
      onPress: () => {
        fetchChatSummary().then((data) => {
          if (data) {
            // dispatcher.setChatSummaryList(data);
            if (data.length > 0) fetchChatDetails(data);
          }
        });
        // onFetch(async () => getFresh()).then((res) => {
        //   if (res) {
        //     dispatcher.setChatSummaryList(res);
        //   } else {
        //     fetchCacheorFresh().then((res) => {
        //       if (res) {
        //         dispatcher.setChatSummaryList(res);
        //       }
        //     });
        //   }
        // });
      },
    },
    {
      title: 'Logout',
      onPress: () => (logout ? logout() : () => console.log('Unable to find Auth API...')),
      disabled: false,
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <ButtonComponent
            title="Create"
            onPress={() => {
              if (dialogRef && dialogRef.current) dialogRef.current.show();
            }}
          />
          <SettingsMenu items={items} />
        </>
      ),
    });
  }, []);

  return (
    <>
      <Button onPress={() => log.debug(chatSummaryList)}>ChatView</Button>
      <CreateChatDialog ref={dialogRef} />
      <ChatSummaryViewContainer />
    </>
  );
}

export default ChatSummaryView;
