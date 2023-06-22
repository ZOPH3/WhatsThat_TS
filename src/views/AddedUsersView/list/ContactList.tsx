import React from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { Text } from 'react-native-paper';

import { TUser } from '../../../lib/types/TSchema';

interface IContactList {
  contacts: TUser[];
}

const ContactList = ({ contacts }: IContactList) => {

  //FIXME: For some reason, sorting the array here causes undefined function error
  return (
    <View>
      <SafeAreaView>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.user_id.toString()}
          renderItem={(_) => (
            <Text>{_.item.first_name}</Text>
          )}
        />
      </SafeAreaView>
    </View>
  );
};
export default ContactList;
