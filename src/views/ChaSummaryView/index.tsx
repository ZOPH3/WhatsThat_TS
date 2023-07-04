import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import ButtonComponent from '../../components/Button';
import SettingsMenu, { IMenuItem } from '../../components/SettingsMenu';
import { useAuthContext } from '../../lib/context/AuthContext';
import CreateChatDialog from './components/Dialog';
import { useChatContext } from '../../lib/context/ChatContext';
import ChatSummaryViewContainer from './ChatSummaryViewContainer';
import log from '../../lib/util/LoggerUtil';
import useChatController from '../../lib/controller/ChatController';

function ChatSummaryView() {
  const navigation = useNavigation();
  const { logout } = useAuthContext();
  const { chatSummaryList } = useChatContext();
  const dialogRef = useRef<{ show: () => void }>();
  const { handleIncomingChatSummary, fetchChatSummaryList } = useChatController();

  // Issue with re rendering closing the keyboard -> dispatcher function seems to be the issue as context is updated, forcing a re render

  const items: IMenuItem[] = [
    {
      title: 'Settings',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      title: 'Reload',
      onPress: () => {
        fetchChatSummaryList().then((data) => {
          if (data) {
            // dispatcher.setChatSummaryList(data);
            if (data.length > 0) handleIncomingChatSummary(data);
          }
        });
      },
    },
    {
      title: 'Logout',
      onPress: () => (logout ? logout() : () => console.log('Unable to find Auth API...')),
      disabled: false,
    },
  ];

  const headerRight = () => (
    <>
      <ButtonComponent
        title="Create"
        onPress={() => {
          if (dialogRef && dialogRef.current) dialogRef.current.show();
        }}
      />
      <SettingsMenu items={items} />
    </>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight,
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
