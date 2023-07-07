/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import React from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { List } from 'react-native-paper';
import { TUser } from '../lib/types/TSchema';
import ProfileAvatar from '../views/SearchUsersView/ProfileAvatar';

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
