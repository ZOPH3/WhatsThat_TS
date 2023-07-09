/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import React from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { List } from 'react-native-paper';
import ProfileAvatar from '../views/SearchUsersView/ProfileAvatar';
import { TUser } from '../lib/types/TSchema';

/**
 * Updated version of ContactList, this will take an array of TUser and render it as a list
 * with avatar, name, and actions.
 * Actions is an object with two functions, onPress and onLongPress.
 * Intention of actions is to allow for methods to be passed down to the list item.
 * @param {TUser[]} contacts
 */
function ContactList({ contacts, actions }) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const avatar = (user: TUser) => {
    return <ProfileAvatar user={user} />;
  };

  const _renderItem = (_) => {
    return (
      <List.Item
        title={`${_.item.first_name} ${_.item.last_name}`}
        left={() => avatar(_.item)}
        right={() => null}
        onPress={() => actions?.onPress(_.item)}
        onLongPress={() => actions?.onLongPress(_.item) ?? null}
      />
    );
  };

  return (
    <View>
      <SafeAreaView>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.user_id.toString()}
          renderItem={(_) => _renderItem(_)}
        />
      </SafeAreaView>
    </View>
  );
}

export default ContactList;
