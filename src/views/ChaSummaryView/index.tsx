import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ProgressBar, Snackbar, Text, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { styles } from '../../styles/GlobalStyle';
import log from '../../lib/util/LoggerUtil';

import ChatSummaryList from './list/ChatSummaryList';
import SettingsMenu, { IMenuItem } from '../../components/SettingsMenu';
import DialogComponent from '../../components/Dialog';

import { useApiContext } from '../../lib/context/ApiContext';
import useFetchHook from '../../lib/hooks/useFetchHook';
import { useAuthContext } from '../../lib/context/AuthContext';
import ButtonComponent from '../../components/Button';
import { useChatContext } from '../../lib/context/ChatContext';

const ChatSummaryView = () => {
  const { useFetch } = useApiContext();
  const { logout, authState } = useAuthContext();
  const { chatSummaryList, dispatcher } = useChatContext();
  const navigation = useNavigation();

  if (!useFetch || !logout) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const { data, isLoading, onFetch, onError, setOnError, getFresh } = useFetchHook(
    { url: '/chat', method: 'GET' },
    true
  );

  const items: IMenuItem[] = [
    {
      title: 'Settings',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      title: 'Reload',
      onPress: () => onFetch(async () => await getFresh()),
    },
    {
      title: 'Logout',
      onPress: () => logout(),
      disabled: false,
    },
  ];

  const { DialogBlock, showDialog, hideDialog } = DialogComponent();
  const dialogContent = [
    {
      children: <TextInput label="Chat name" />,
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerRight: () => (
        <>
          <ButtonComponent title={'Create'} onPress={() => showDialog()} />
          <SettingsMenu items={items} />
        </>
      ),
    });
    onFetch(async () => await getFresh()).then((data) => {
      dispatcher.setChatSummaryList(data);
    });
  }, []);

  const Result = () => {
    if (isLoading) return <ProgressBar indeterminate={true} visible={isLoading} />;
    if (onError) return <Text>{onError}</Text>;
    if (chatSummaryList.length > 0) {
      return (
        <View>
          <ChatSummaryList chatSummary={chatSummaryList} />
        </View>
      );
    }
    return <Text>No chats</Text>;
  };

  return (
    <View style={styles.container}>
      <ButtonComponent
        title={'Login thing'}
        onPress={async () => console.log(authState)}
      />
      <Result />
      <DialogBlock
        title={'Create Chat'}
        content={dialogContent}
        actions={
          <>
            <ButtonComponent
              title={'Cancel'}
              onPress={() => {
                hideDialog();
              }}
            />
            <ButtonComponent
              title={'Create Chat'}
              mode="contained"
              onPress={() => {
                onFetch(async () => await getFresh());
                hideDialog();
              }}
            />
          </>
        }
      />
      <Snackbar visible={onError !== undefined} onDismiss={() => setOnError(undefined)}>
        {onError}
      </Snackbar>
    </View>
  );
};

export default ChatSummaryView;
