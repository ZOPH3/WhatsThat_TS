/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { View } from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  Button,
  Card,
  HelperText,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';

import { useApi } from '../../lib/context/api';
import { useAuth } from '../../lib/context/auth';
import ImageFetcher from '../../lib/hooks/ImageFetcher';

import CameraComponent from './CameraComponent';
import UserServices from '../../lib/services/UserServices';
import { useNotification } from '../../lib/context/notification';
import useConfirm from '../../lib/hooks/useConfirm';

function ProfileView({ navigation }) {
  const { apiCaller } = useApi();
  const { authState, setAuthState } = useAuth();
  const { current_user, id } = authState;
  if (!current_user || !apiCaller) throw new Error('Missing authState or apiCaller');
  const u = UserServices(apiCaller);
  const n = useNotification();

  const [user, setUser] = useState<{ first_name: string; last_name: string }>({
    first_name: current_user.first_name,
    last_name: current_user.last_name,
  });
  const [editedUser, setEditedUser] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const { first_name, last_name } = user;
  const { isLoading, data, setData } = ImageFetcher(`user/${current_user.user_id}/photo`);

  const [fetchLoading, setFetchLoading] = useState(false);
  const [seePass, setSeePass] = React.useState(false);

  const save = useConfirm();

  useEffect(() => {
    setUser({ first_name: current_user.first_name, last_name: current_user.last_name });
  }, [authState]);

  const _handleSave = async () => {
    save.setConfirm('Are you sure you want to save?', 'Save Changes');
    const res = await save.confirm();

    if (res) {
      setFetchLoading(true);
      setIsEditing(false);
      if (!current_user.user_id) return;
      const payload = newPassword !== '' ? { ...editedUser, password: newPassword } : editedUser;

      u.updateUserInfo(current_user.user_id, payload)
        .then((res) => {
          if (res) {
            setUser(editedUser);
            setAuthState({
              ...authState,
              current_user: { ...current_user, ...editedUser },
            });
            n.dispatcher.addNotification({ type: 'Success', message: 'Updated!' });
          }
        })
        .catch((err) => {
          n.dispatcher.addNotification({ type: 'Error', message: 'Unable to update.' });
        })
        .finally(() => {
          setIsEditing(false);
          setFetchLoading(false);
          setNewPassword('');
        });
    }
  };

  const sendToServer = async (data: any) => {
    const res = await fetch(data.base64);
    const blob = await res.blob();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const response: AxiosResponse = await apiCaller(
      {
        url: `user/${current_user.user_id}/photo`,
        method: 'POST',
        data: blob,
        headers: { 'Content-Type': 'image/png' },
      },
      true
    );

    if (response && response.status === 200) setData(data.base64);
  };

  const passwordErrors = () => {
    if (newPassword === '') return false;

    const regex = '^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$';

    return !(newPassword.length > 8) || newPassword.match(regex);
  };
  const firstNameErrors = () => {
    if (editedUser.first_name === '') return false;
    return !(editedUser.first_name.length > 1);
  };
  const lastNameErrors = () => {
    if (editedUser.last_name === '') return false;
    return !(editedUser.last_name.length > 1);
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={`Hi, ${first_name} ${last_name}`} />
        <Appbar.Action
          icon="pencil"
          selected={isEditing}
          onPress={() => setIsEditing(!isEditing)}
        />
      </Appbar.Header>

      <View style={{ margin: 10 }}>
        {!!isEditing && (
          <View style={{ marginBottom: 20 }}>
            <Card style={{ padding: 20 }}>
              <TextInput
                mode="outlined"
                label="First Name"
                value={editedUser.first_name}
                onChangeText={(e) => setEditedUser({ ...editedUser, first_name: e })}
              />
              <HelperText type="error" visible={firstNameErrors()}>
                First name can not be 1 character!
              </HelperText>
              <TextInput
                mode="outlined"
                label="Last Name"
                value={editedUser.last_name}
                onChangeText={(e) => setEditedUser({ ...editedUser, last_name: e })}
              />
              <HelperText type="error" visible={lastNameErrors()}>
                Last name can not be 1 character!
              </HelperText>
              <TextInput
                mode="outlined"
                label="Password"
                value={newPassword}
                onChangeText={(e) => setNewPassword(e)}
                secureTextEntry={!seePass}
                right={<TextInput.Icon onPress={() => setSeePass(!seePass)} icon="eye" />}
              />
              <HelperText type="error" visible={passwordErrors()}>
                Password must be 8 characters, contain 1 uppercase, 1 lowercase and 1 number!
              </HelperText>
              <Button mode="contained" onPress={_handleSave}>
                Save
              </Button>
            </Card>
          </View>
        )}
        <Card style={{ padding: 20 }}>
          {isLoading ? <ActivityIndicator /> : <Card.Cover source={{ uri: data || null }} />}
        </Card>
        <View style={{ marginTop: 10 }}>
          <CameraComponent trigger={sendToServer} />
        </View>
        <Portal>
          <save.ConfirmationDialog />
        </Portal>
      </View>
    </View>
  );
}

export default ProfileView;
