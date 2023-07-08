/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import React from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { Button, Checkbox, Dialog, List, Portal, Text } from 'react-native-paper';

import { useApi } from '../../lib/context/api';
import ContactServices from '../../lib/services/ContactServices';
import ProfileAvatar from './ProfileAvatar';

import { TUser } from '../../lib/types/TSchema';
import { intLog } from '../../lib/util/LoggerUtil';
import useConfirm from '../../lib/hooks/useConfirm';
import { useNotification } from '../../lib/context/notification';

interface IContactList {
  contacts: TUser[];
  listType: 'all' | 'blocked' | 'contacts';
}

function ContactListActions() {
  const n = useNotification();
  const { apiCaller } = useApi();
  if (!apiCaller) throw new Error('useFetch is null');
  const c = ContactServices(apiCaller);
  const handleRemove = (user_id: number | undefined) => {
    if (!user_id) return;
    c.deleteContact(user_id)
      .then((res) => {
        intLog.success('[Remove User]', res);
        n.dispatcher.addNotification({
          type: 'success',
          message: res === 'OK' ? 'User removed' : res,
        });
      })
      .catch((err) => {
        intLog.error('[Remove User]', err);
        n.dispatcher.addNotification({ type: 'Error', message: err });
      });
  };

  const handleBlock = (user_id: number | undefined) => {
    if (!user_id) return;
    c.unblockUser(user_id)
      .then((res) => {
        if (res) {
          intLog.success('[Block User]', res);
          n.dispatcher.addNotification({
            type: 'success',
            message: res === 'OK' ? 'User blocked' : res,
          });
        }
      })
      .catch((err) => {
        intLog.error('[Block User]', err);
        n.dispatcher.addNotification({ type: 'Error', message: 'Something went wrong...' });
      });
  };

  const handleUnblock = (user_id: number | undefined) => {
    if (!user_id) return;
    c.unblockUser(user_id)
      .then(
        (res) => {
          if (res) {
            intLog.success('[Unblock User]', res);
            n.dispatcher.addNotification({
              type: 'success',
              message: res === 'OK' ? 'User unblocked' : res,
            });
          }
        },
        (err) => intLog.error('[Unblock User]', err)
      )
      .catch((err) => {
        intLog.error('[Unblock User]', err);
        n.dispatcher.addNotification({ type: 'Error', message: 'Something went wrong...' });
      });
  };

  const handleAdd = (user_id: number | undefined) => {
    if (!user_id) return;
    c.addContact(user_id)
      .then(
        (res) => {
          if (res) {
            intLog.success('[Add User]', res);
            n.dispatcher.addNotification({
              type: 'success',
              message: res === 'OK' ? 'User Added' : res,
            });
          }
        },
        (err) => intLog.error('[Add User]', err)
      )
      .catch((err) => {
        intLog.error('[Add User]', err);
        n.dispatcher.addNotification({ type: 'Error', message: err });
      });
  };

  return { handleAdd, handleRemove, handleBlock, handleUnblock };
}

function RemoveContactDialog(props: {
  visible: boolean;
  user: Partial<TUser>;
  hideDialog: () => void;
}): JSX.Element {
  const { visible, user, hideDialog } = props;
  const { first_name, last_name, user_id } = user;
  const [checked, setChecked] = React.useState(false);

  const { handleRemove, handleBlock } = ContactListActions();

  const _handleOK = () => {
    if (checked) {
      handleBlock(user_id);
    } else {
      handleRemove(user_id);
    }
    hideDialog();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Icon icon="alert" />
        <Dialog.Title>
          Remove {first_name} {last_name} from your contacts?
        </Dialog.Title>
        <Dialog.Content>
          <Checkbox.Item
            label={`Block ${first_name} ${last_name}`}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => hideDialog()}>Cancel</Button>
          <Button onPress={() => _handleOK()}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

function ContactList({ contacts, listType }: IContactList) {
  const add = useConfirm();
  const unblock = useConfirm();

  const [visible, setVisible] = React.useState(false);
  const [user, setUser] = React.useState<TUser | null>(null);
  const hideDialog = () => setVisible(false);

  const { handleAdd, handleUnblock } = ContactListActions();

  const _handleUnblock = async (user_id: number, title: string, message: string) => {
    unblock.setConfirm(title, message);
    const res = await unblock.confirm();
    if (res) {
      handleUnblock(user_id);
      hideDialog();
    }
  };

  const _handleAdd = async (user_id: number, title: string, message: string) => {
    add.setConfirm(title, message);
    const res = await add.confirm();
    if (res) {
      handleAdd(user_id);
      hideDialog();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const avatar = (user: TUser) => {
    return <ProfileAvatar user={user} />;
  };

  // TODO: Add button to add instead of long clcking to make it more obvious
  const _renderItem = (_) => {
    return (
      <List.Item
        title={`${_.item.first_name} ${_.item.last_name}`}
        left={() => avatar(_.item)}
        right={() => null}
        onPress={async () => {
          if (listType === 'blocked') {
            await _handleUnblock(
              _.item.user_id,
              'Unblock User',
              `Are you sure you want to Unblock ${_.item.first_name} ${_.item.last_name}?`
            );
          } else {
            await _handleAdd(
              _.item.user_id,
              'Add Contact',
              `Are you sure you want to add ${_.item.first_name} ${_.item.last_name}?`
            );
          }
        }}
        onLongPress={() => {
          if (listType !== 'blocked') {
            setUser(_.item);
            setVisible(true);
          }
        }}
      />
    );
  };

  // FIXME: For some reason, sorting the array here causes undefined function error
  return (
    <View>
      <SafeAreaView>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.user_id.toString()}
          renderItem={(_) => _renderItem(_)}
        />
        {!!user && <RemoveContactDialog visible={visible} user={user} hideDialog={hideDialog} />}
        <Portal>
          <add.ConfirmationDialog />
          <unblock.ConfirmationDialog />
        </Portal>
      </SafeAreaView>
    </View>
  );
}

export default ContactList;
