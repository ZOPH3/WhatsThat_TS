/* eslint-disable react/jsx-no-bind */
import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

import { useAuth } from '../../lib/context/auth';
import useChatController from '../../lib/controller/ChatController';

import ChatSummaryViewContainer from './ChatSummaryViewContainer';
import SettingsMenu, { IMenuItem } from '../../components/SettingsMenu';
import CreateChatDialog from './components/Dialog';
import ButtonComponent from '../../components/Button';
import HandleLogout from '../../lib/hooks/HandleLogout';

function ChatSummaryView() {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const dialogRef = useRef<{ show: () => void }>();
  const { fetchChatDetails, fetchChatSummary } = useChatController();
  const { handleCache, handleState } = HandleLogout();
  // Issue with re rendering closing the keyboard -> dispatcher function seems to be the issue as context is updated, forcing a re render

  function reload() {
    fetchChatSummary().then((data) => {
      if (data) {
        // dispatcher.setChatSummaryList(data);
        if (data.length > 0) fetchChatDetails(data);
      }
    });
  }
  const items: IMenuItem[] = [
    {
      title: 'Profile',
      onPress: () => navigation.navigate('ProfileStackNavigator'),
    },
    {
      title: 'Reload',
      onPress: () => {
        reload();
      },
    },
    {
      title: 'Logout',
      onPress: () => {
        if (logout) {
          logout();
          handleCache();
          handleState();
        } else {
          console.log('Unable to find Auth API...');
        }
      },
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
      <ChatSummaryViewContainer reload={reload} />
      <CreateChatDialog ref={dialogRef} />
    </>
  );
}

export default ChatSummaryView;
