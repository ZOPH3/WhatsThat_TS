/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import React from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { Button, Checkbox, Dialog, List, Portal, Text } from 'react-native-paper';

import { TUser } from '../../../lib/types/TSchema';
import ContactServices from '../../../lib/services/ContactServices';
import { useApiContext } from '../../../lib/context/ApiContext';
import { intLog } from '../../../lib/util/LoggerUtil';
import ProfileAvatar from '../../SearchUsersView/ProfileAvatar';

interface IContactList {
  contacts: TUser[];
  listType: 'all' | 'blocked' | 'contacts';
}

function ContactListActions() {
  const { useFetch } = useApiContext();
  if (!useFetch) throw new Error('useFetch is null');

  const handleRemove = (user_id: number | undefined) => {
    if (!user_id) return;
    ContactServices(useFetch)
      .deleteContact(user_id)
      .then((res) => {
        intLog.success('[Remove User]', res);
      })
      .catch((err) => {
        intLog.error('[Remove User]', err);
      });
  };

  const handleBlock = (user_id: number | undefined) => {
    if (!user_id) return;
    ContactServices(useFetch)
      .blockUser(user_id)
      .then((res) => {
        if (res) intLog.success('[Block User]', res);
      })
      .catch((err) => {
        intLog.error('[Block User]', err);
      });
  };

  const handleUnblock = (user_id: number | undefined) => {
    if (!user_id) return;
    ContactServices(useFetch)
      .unblockUser(user_id)
      .then(
        (res) => {
          if (res) intLog.success('[Unblock User]', res);
        },
        (err) => intLog.error('[Unblock User]', err)
      )
      .catch((err) => {
        intLog.error('[Unblock User]', err);
      });
  };

  const handleAdd = (user_id: number | undefined) => {
    if (!user_id) return;
    ContactServices(useFetch)
      .addContact(user_id)
      .then(
        (res) => {
          if (res) intLog.success('[Add User]', res);
        },
        (err) => intLog.error('[Add User]', err)
      )
      .catch((err) => {
        intLog.error('[Add User]', err);
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
  const [visible, setVisible] = React.useState(false);
  const [user, setUser] = React.useState<TUser | null>(null);
  const hideDialog = () => setVisible(false);

  const { handleAdd, handleUnblock } = ContactListActions();

  const _handleUnblock = (user_id: number) => {
    handleUnblock(user_id);
    hideDialog();
  };

  const _handleAdd = (user_id: number) => {
    handleAdd(user_id);
    hideDialog();
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const avatar = (user: TUser) => {
    return <ProfileAvatar user={user} />;
  };

  //TODO: Add button to add instead of long clcking to make it more obvious
  const _renderItem = (_) => {
    return (
      <List.Item
        title={`${_.item.first_name}`}
        left={() => avatar(_.item)}
        right={() => null}
        onPress={() => {
          if (listType === 'blocked') {
            _handleUnblock(_.item.user_id);
          } else {
            _handleAdd(_.item.user_id);
          }
        }}
        onLongPress={() => {
          setUser(_.item);
          setVisible(true);
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
      </SafeAreaView>
    </View>
  );
}

export default ContactList;
