import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import ButtonComponent from '../../components/Button';
import SettingsMenu, { IMenuItem } from '../../components/SettingsMenu';
import { useAuthContext } from '../../lib/context/AuthContext';
import CreateChatDialog from './components/Dialog';
import ChatSummaryViewContainer from './ChatSummaryViewContainer';
import useChatController from '../../lib/controller/ChatController';

function ChatSummaryView() {
  const navigation = useNavigation();
  const { logout } = useAuthContext();
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

  const headerRight = () => (
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <ButtonComponent
        title="Create"
        onPress={() => {
          if (dialogRef && dialogRef.current) dialogRef.current.show();
        }}
      />
      <ButtonComponent
        title="Profile"
        onPress={() => {
          navigation.navigate('ProfileStackNavigator');
        }}
      />
      <SettingsMenu items={items} />
    </View>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, []);

  return (
    <>
      <CreateChatDialog ref={dialogRef} />
      <ChatSummaryViewContainer />
    </>
  );
}

export default ChatSummaryView;
