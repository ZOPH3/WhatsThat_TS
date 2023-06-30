/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import {
  Appbar,
  Button,
  Card,
  Chip,
  IconButton,
  ProgressBar,
  Text,
  TextInput,
  Tooltip,
} from 'react-native-paper';
import useFetchHook from '../../lib/hooks/useFetchHook';
import styles from '../../styles/GlobalStyle';
import { TChat, TUser } from '../../lib/types/TSchema';
import { useAuthContext } from '../../lib/context/AuthContext';
import ContactList from '../AddedUsersView/list/ContactList';

function ChatDetails(props: { chatDetails: TChat; isEditing: boolean }) {
  const { chatDetails, isEditing } = props;
  const { name, creator, members, messages } = chatDetails;
  return (
    <View>
      <Card>
        <Card.Content>
          {isEditing ? (
            <TextInput label="title" value={name} mode="outlined" />
          ) : (
            <Text variant="titleLarge">{name}</Text>
          )}
        </Card.Content>
      </Card>
    </View>
  );
}

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
  const current_user = useAuthContext().authState.id;
  const [isOwner, setIsOwner] = React.useState<boolean>(false);
  const [chatDetails, setChatDetails] = React.useState<TChat | undefined>(undefined);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [titleEdit, setTitleEdit] = React.useState<string>('');

  const { isLoading, onError, onFetch, getFresh } = useFetchHook(
    { url: `/chat/${chat_id}`, method: 'GET' },
    true
  );

  function _handleEdit() {
    console.log('Edit done');
  }

  useEffect(() => {
    onFetch(async () => getFresh()).then((res) => {
      if (res) {
        // console.log(res);
        setChatDetails(res as TChat);
        setTitleEdit(res.name);
      }
    });
  }, []);

  useEffect(() => {
    // console.log(current_user);
    if (!chatDetails || !current_user) return;
    if (chatDetails.creator.user_id === current_user) {
      setIsOwner(true);
    }
  }, [chatDetails]);

  useEffect(() => {
    if (titleEdit !== '' && titleEdit !== chatDetails?.name) {
      _handleEdit();
    }
  }, [isEditing]);

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
      <ProgressBar indeterminate visible={isLoading} />
      <SafeAreaView style={{ flex: 10, margin: 10 }}>
        {!!onError && <Text>{onError}</Text>}
        {!chatDetails && <Text>Unable to find details</Text>}
        {!!chatDetails && (
          <Card>
            <Card.Content>
              {/* {isEditing ? ( */}
              <TextInput
                label="title"
                value={titleEdit}
                mode="outlined"
                onChangeText={(e) => setTitleEdit(e)}
                editable={isEditing}
              />
              {/* ) : (
                <Text variant="titleLarge">{titleEdit !== '' ? titleEdit : chatDetails.name}</Text>
              )} */}
            </Card.Content>
          </Card>
        )}
        {!!chatDetails && <Members members={chatDetails.members} />}
        {!!isOwner && <Text>Owner</Text>}
      </SafeAreaView>
    </View>
  );
}

export default EditChatView;
