import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

import { useAuth } from '../../lib/context/auth';
import useChatController from '../../lib/controller/ChatController';

import ChatSummaryViewContainer from './ChatSummaryViewContainer';
import SettingsMenu, { IMenuItem } from '../../components/SettingsMenu';
import CreateChatDialog from './components/Dialog';
import ButtonComponent from '../../components/Button';

function ChatSummaryView() {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const dialogRef = useRef<{ show: () => void }>();
  const { fetchChatDetails, fetchChatSummary } = useChatController();

  // Issue with re rendering closing the keyboard -> dispatcher function seems to be the issue as context is updated, forcing a re render

  const items: IMenuItem[] = [
    {
      title: 'Profile',
      onPress: () => navigation.navigate('ProfileStackNavigator'),
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
      },
    },
    {
      title: 'Logout',
      onPress: () => (logout ? logout() : () => console.log('Unable to find Auth API...')),
      disabled: false,
    },
  ];

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Chat" />
        <ButtonComponent
          title="Create"
          onPress={() => {
            if (dialogRef && dialogRef.current) dialogRef.current.show();
          }}
        />
        <SettingsMenu items={items} onPress={() => navigation.navigate('ProfileStackNavigator')} />
      </Appbar.Header>
      <CreateChatDialog ref={dialogRef} />
      <ChatSummaryViewContainer />
    </>
  );
}

export default ChatSummaryView;
