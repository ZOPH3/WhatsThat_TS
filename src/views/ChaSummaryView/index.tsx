import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Button } from 'react-native-paper';
import { Image, View } from 'react-native';
import ButtonComponent from '../../components/Button';
import SettingsMenu, { IMenuItem } from '../../components/SettingsMenu';
import { useAuthContext } from '../../lib/context/AuthContext';
import CreateChatDialog from './components/Dialog';
import { useChatContext } from '../../lib/context/ChatContext';
import ChatSummaryViewContainer from './ChatSummaryViewContainer';
import log from '../../lib/util/LoggerUtil';
import useChatController from '../../lib/controller/ChatController';

import ImageFetcher from '../../lib/hooks/ImageFetcher';
import AvatarComponent from '../../components/Avatar';

function ChatSummaryView() {
  const navigation = useNavigation();
  const { logout } = useAuthContext();
  // const { chatSummaryList } = useChatContext();
  const dialogRef = useRef<{ show: () => void }>();
  const { fetchChatDetails, fetchChatSummary } = useChatController();

  const { data, ImageProfile, makeRequest, isLoading } = ImageFetcher('user/3/photo');

  // const [data, setData] = React.useState<any>(undefined);

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

  const newImage = (src) => {
    return <Image source={{ uri: src }} />;
  };

  return (
    <>
      <ImageProfile />
      {isLoading ? (
        <></>
      ) : (
        <Avatar.Image
          source={{
            uri: data,
          }}
        />
      )}
      {/* <ImageProfile /> */}

      <Button onPress={() => makeRequest()}>bbbbbb</Button>
      <CreateChatDialog ref={dialogRef} />
      <ChatSummaryViewContainer />
    </>
  );
}

export default ChatSummaryView;
