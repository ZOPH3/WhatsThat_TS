import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { ProgressBar, Text, TextInput } from 'react-native-paper';

import { useApi } from '../../lib/context/api';
import { useAuth } from '../../lib/context/auth';
import useFetchHook from '../../lib/hooks/useFetchHook';

import ContactList from './list/ContactList';
import ButtonComponent from '../../components/Button';
import DialogComponent from '../../components/Dialog';

import styles from '../../styles/GlobalStyle';
import log from '../../lib/util/LoggerUtil';

function AddedUsersView() {
  const { apiCaller } = useApi();
  const { logout } = useAuth();

  if (!apiCaller || !logout) {
    log.error('Unable to find Auth API...');
    throw new Error('Unable to find Auth API...');
  }

  const { data, isLoading, onFetch, onError, getFresh, getCache } = useFetchHook(
    { url: '/contacts', method: 'GET' },
    true
  );

  const { DialogBlock, showDialog, hideDialog } = DialogComponent();
  const dialogContent = [
    {
      children: <TextInput label="Chat name" />,
    },
  ];

  useEffect(() => {
    onFetch(() => getCache())
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .then((data) => {
        if (!data) return;
        console.log('Not implemented', data);
      })
      .catch();
  }, []);

  return (
    <View style={styles.container}>
      <ProgressBar indeterminate visible={isLoading} />
      <SafeAreaView style={{ flex: 10 }}>
        {!!onError && <Text>{onError}</Text>}
        {!data && <Text>No contacts</Text>}
        {!!data && <ContactList contacts={data} listType="contacts" />}
      </SafeAreaView>
      <DialogBlock
        title="Create Chat"
        content={dialogContent}
        actions={
          <>
            <ButtonComponent
              title="Cancel"
              onPress={() => {
                hideDialog();
              }}
            />
            <ButtonComponent
              title="Create Chat"
              mode="contained"
              onPress={() => {
                onFetch(async () => getFresh());
                hideDialog();
              }}
            />
          </>
        }
      />
    </View>
  );
}

export default AddedUsersView;
