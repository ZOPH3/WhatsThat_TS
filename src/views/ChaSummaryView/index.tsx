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

const ChatSummaryView = () => {
  const { useFetch } = useApiContext();
  const { logout } = useAuthContext();
  const navigation = useNavigation();

  if (!useFetch || !logout) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const { data, isLoading, onFetch, onError, setOnError } = useFetchHook(
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
      onPress: () => onFetch(),
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
    onFetch();
  }, []);

  const Result = () => {
    if (isLoading) return <ProgressBar indeterminate={true} visible={isLoading} />;
    if (onError) return <Text>{onError}</Text>;
    if (!data) return <Text>No chat summary</Text>;

    if (data) {
      return (
        <View>
          <ChatSummaryList chatSummary={data} />
        </View>
      );
    }
    return <Text>ChaSummaryView</Text>;
  };

  return (
    <View style={styles.container}>
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
                onFetch();
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
