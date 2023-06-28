import React from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { List, Text } from 'react-native-paper';

import { TUser } from '../../../lib/types/TSchema';
import AvatarComponent from '../../../components/Avatar';

interface IContactList {
  contacts: TUser[];
}

const actions = {
  delete: () => console.log('delete'),
  edit: () => console.log('edit'),
  goTo: () => console.log('goTo'),
};

const ContactList = ({ contacts }: IContactList) => {
  //FIXME: For some reason, sorting the array here causes undefined function error
  return (
    <View>
      <SafeAreaView>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.user_id.toString()}
          renderItem={(_) => (
            <List.Item
              title={`${_.item.first_name}`}
              left={(props) => <AvatarComponent label={`${_.item.first_name}`} size={50} />}
              right={(props) => null}
              onPress={actions.goTo}
              onLongPress={actions.edit}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
};
export default ContactList;
