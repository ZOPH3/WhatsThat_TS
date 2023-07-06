/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import {
  Appbar,
  Button,
  Card,
  Chip,
  Dialog,
  FAB,
  IconButton,
  Modal,
  Portal,
  ProgressBar,
  Text,
  TextInput,
  Tooltip,
} from 'react-native-paper';

import useFetchHook from '../../lib/hooks/useFetchHook';
import { useAuth } from '../../lib/context/auth';
import { useApi } from '../../lib/context/api';
import ChatServices from '../../lib/services/ChatServices';

import ContactList from '../AddedUsersView/list/ContactList';
import { TChat, TUser } from '../../lib/types/TSchema';
import styles from '../../styles/GlobalStyle';

function Members(props: { members: TUser[] }) {
  const { members } = props;

  return (
    <View>
      <ContactList contacts={members} listType="contacts" />
    </View>
  );
}

function EditChatView({ route, navigation }) {
  const { chat_id } = route.params;
  const { apiCaller } = useApi();
  const current_user = useAuth().authState.id;
  const c = ChatServices(apiCaller);

  const [chatDetails, setChatDetails] = React.useState<TChat | undefined>(undefined);
  const [isOwner, setIsOwner] = React.useState<boolean>(false);
  const [titleEdit, setTitleEdit] = React.useState<string>('');
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [handleEditLoad, setHandleEditLoad] = React.useState<boolean>(false);

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const { isLoading, onError, onFetch, getFresh } = useFetchHook(
    { url: `/chat/${chat_id}`, method: 'GET' },
    true
  );

  function _handleEdit() {
    if (titleEdit !== '' && titleEdit !== chatDetails?.name) {
      setHandleEditLoad(true);
      c.updateChatDetails(chat_id, { name: titleEdit })
        .then((res) => {
          // console.log(res);
          if (res !== undefined) {
            console.log('Edit done', res);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setHandleEditLoad(false);
        });
    }
    hideDialog();
  }

  // Api call
  useEffect(() => {
    onFetch(async () => getFresh()).then((res) => {
      if (res) {
        // console.log(res);
        setChatDetails(res as TChat);
        setTitleEdit(res.name);
      }
    });
  }, []);

  // Set if owner
  useEffect(() => {
    // console.log(current_user);
    if (!chatDetails || !current_user) return;
    if (chatDetails.creator.user_id === current_user) {
      setIsOwner(true);
    }
  }, [chatDetails]);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Chat Details" />
        {/* <Tooltip title="Invite user">
          <IconButton
            icon="account-plus"
            selected={isEditing}
            size={24}
            onPress={() => setIsEditing(!isEditing)}
          />
        </Tooltip> */}
        <Tooltip title="Show Contacts">
          <IconButton
            icon="content-save-edit"
            selected={isEditing}
            size={24}
            onPress={() => setIsEditing(!isEditing)}
          />
        </Tooltip>
      </Appbar.Header>

      <ProgressBar indeterminate visible={isLoading || handleEditLoad} />
      <SafeAreaView style={{ flex: 10, margin: 10 }}>
        {!!onError && <Text>{onError}</Text>}
        {!chatDetails && <Text>Unable to find details</Text>}
        {!!chatDetails && <Members members={chatDetails.members} />}
        {!!isOwner && <Text>Owner</Text>}

        <Portal>
          <FAB.Group
            style={{ position: 'absolute', bottom: 50, right: 0 }}
            open={open}
            visible
            icon={open ? 'pencil' : 'dots-vertical'}
            actions={[
              //   { icon: 'plus', onPress: () => console.log('Pressed add') },
              {
                icon: 'account-multiple-plus',
                label: 'Invite user',
                onPress: () => console.log('Pressed star'),
              },
              {
                icon: 'file-document-edit',
                label: 'Edit chat',
                onPress: showDialog,
              },
              {
                icon: 'archive',
                label: 'View Drafts',
                onPress: () => console.log('Pressed notifications'),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Edit Chat Name</Dialog.Title>
            <Dialog.Content>
              <TextInput value={titleEdit} mode="outlined" onChangeText={(e) => setTitleEdit(e)} />
            </Dialog.Content>
            <Dialog.Actions style={{ flexDirection: 'row' }}>
              <Button style={{ flex: 1, alignSelf: 'flex-end' }} onPress={hideDialog}>
                Cancel
              </Button>
              <Button style={{ flex: 1, alignSelf: 'flex-end' }} onPress={() => _handleEdit()}>
                Done
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </SafeAreaView>
    </View>
  );
}

export default EditChatView;
