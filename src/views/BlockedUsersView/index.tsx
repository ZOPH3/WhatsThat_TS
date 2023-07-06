import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ProgressBar, Text, TextInput } from 'react-native-paper';

import useFetchHook from '../../lib/hooks/useFetchHook';

import styles from '../../styles/GlobalStyle';

import DialogComponent from '../../components/Dialog';
import ButtonComponent from '../../components/Button';
import ContactList from '../AddedUsersView/list/ContactList';

function BlockedUsersView() {
  const { data, isLoading, onFetch, onError, getFresh, getCache } = useFetchHook(
    { url: '/blocked', method: 'GET' },
    true
  );

  const { DialogBlock, showDialog, hideDialog } = DialogComponent();
  const dialogContent = [
    {
      children: <TextInput label="Chat name" />,
    },
  ];

  useEffect(() => {
    onFetch(async () => getCache())
      .then((data) => {
        if (!data) return;
        // console.log('Not implemented', data);
      })
      .catch();
  }, []);

  return (
    <View style={styles.container}>
      <ProgressBar indeterminate visible={isLoading} />
      {!!onError && <Text>{onError}</Text>}
      {!data && <Text>No contacts</Text>}
      {!!data && <ContactList contacts={data} listType="blocked" />}
      {/* <Result /> */}
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

export default BlockedUsersView;
