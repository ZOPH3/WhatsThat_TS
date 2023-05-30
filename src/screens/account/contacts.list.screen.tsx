import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import IsLoadingIndicator from '../../components/utils/isLoadingIndicator.component';
import { User } from '../../types/api.schema.types';
import useQuery from '../../hooks/useQuery';
import { Avatar, ListItem } from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { stringToColour } from '../../util/colors.util';
import ContactController from '../../controllers/contact.controller';

function ContactsScreen() {
  const [contactList, setContactList] = useState<User[]>();

  const { data, isLoading, isSuccess, error, refetch } = useQuery<User[]>(
    () => ContactController.fetchContacts(),
    {
      onSuccess: (data) => {
        setContactList(data);
      },
    }
  );

  // function addContact(user_id: number) {
  //   ContactServices.addContact(user_id).then((result) => {
  //     if (result) {
  //       refetch();
  //     } else {
  //       alert('Unable to add user to contact' + error);
  //     }
  //   });
  // }

  // function addToBlock(user_id: number) {
  //   ContactServices.addContact(user_id).then((result) => {
  //     if (result && result.ok) {
  //       refetch();
  //     } else {
  //       alert('Unable to add user to contact');
  //     }
  //   });
  // }

  //TODO: Use Composition instead of this mess
  if (isLoading) {
    return <IsLoadingIndicator />;
  } 
  else {
    if (isSuccess && contactList) {
      return (
        <SafeAreaView>
          <ScrollView>
            {contactList.map((contact, key) => (
              <ListItem
                key={key}
                leadingMode="avatar"
                leading={
                  <Avatar
                    label={`${contact.first_name} ${contact.last_name}`}
                    color={`${stringToColour(
                      `${contact.first_name} ${contact.last_name}` + `${contact.email}`
                    )}`}
                  />
                }
                title={`${contact.first_name} ${contact.last_name}`}
                secondaryText={`${contact.email}`}
                trailing={(props) => <Icon name="chevron-right" {...props} />}
                //TODO: remove contact or block
                onPress={() =>
                  alert(`Go to ${`${contact.first_name} ${contact.last_name}`}'s profile?`)
                }
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return <></>;
    }
  }
}

export default ContactsScreen;
