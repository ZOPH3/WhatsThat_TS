/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import React from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { Button, Checkbox, Dialog, List, Portal, Text } from 'react-native-paper';

import { TUser } from '../../../lib/types/TSchema';
import AvatarComponent from '../../../components/Avatar';
import styles from '../../../styles/GlobalStyle';
import UserServices from '../../../lib/services/UserServices';
import ContactServices from '../../../lib/services/ContactServices';
import { useApiContext } from '../../../lib/context/ApiContext';
import { intLog } from '../../../lib/util/LoggerUtil';

interface IContactList {
  contacts: TUser[];
}

// const actions = {
//   delete: () => console.log('delete'),
//   edit: () => console.log('edit'),
//   goTo: () => console.log('goTo'),
// };

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
        intLog.error('[Block User]', err.statusText);
      });
  };

  function handleAdd() {
    console.log('Add');
  }

  return { handleAdd, handleRemove, handleBlock };
}

function RemoveContactDialog(props: {
  visible: boolean;
  user: Partial<TUser>;
  hideDialog: () => void;
}): JSX.Element {
  const { visible, user, hideDialog } = props;
  const { first_name, last_name, user_id } = user;
  const [checked, setChecked] = React.useState(false);

  // const { useFetch } = useApiContext();
  // if (!useFetch) throw new Error('useFetch is null');

  // const _handleRemove = () => {
  //   if (!user_id) return;
  //   const response = ContactServices(useFetch)
  //     .deleteContact(user_id)
  //     .then((res) => {
  //       intLog.success('[Remove User]', res);
  //     })
  //     .catch((err) => {
  //       intLog.error('[Remove User]', err);
  //     });
  // };

  // const _handleBlock = () => {
  //   if (!user_id) return;
  //   ContactServices(useFetch)
  //     .blockUser(user_id)
  //     .then((res) => {
  //       if (res) intLog.success('[Block User]', res);
  //     })
  //     .catch((err) => {
  //       intLog.error('[Block User]', err.statusText);
  //     });
  // };

  const { handleAdd, handleRemove, handleBlock } = ContactListActions();

  const _handleOK = () => {
    if (checked) {
      // _handleBlock();
      handleBlock(user_id);
    } else {
      // _handleRemove();
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
          {/* <Text variant="bodyMedium">This is simple dialog</Text> */}
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

function ContactList({ contacts }: IContactList) {
  const [visible, setVisible] = React.useState(false);
  const [user, setUser] = React.useState<TUser | null>(null);
  const hideDialog = () => setVisible(false);

  const _handleAdd = () => {
    console.log('Add');
    hideDialog();
  };

  // FIXME: For some reason, sorting the array here causes undefined function error
  return (
    <View>
      <SafeAreaView>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.user_id.toString()}
          renderItem={(_) => (
            <List.Item
              title={`${_.item.first_name}`}
              left={() => <AvatarComponent label={`${_.item.first_name}`} size={50} />}
              right={() => null}
              onPress={_handleAdd}
              onLongPress={() => {
                setUser(_.item);
                setVisible(true);
              }}
            />
          )}
        />
        {!!user && <RemoveContactDialog visible={visible} user={user} hideDialog={hideDialog} />}
      </SafeAreaView>
    </View>
  );
}

export default ContactList;
