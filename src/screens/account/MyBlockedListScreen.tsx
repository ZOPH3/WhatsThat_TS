import React, { useState } from 'react';
import IsLoadingIndicator from '../../components/utils/LoadingIndicator';
import { User } from '../../types/TSchema';
import useQuery from '../../hooks/UseQueryHook';
import { ListItem, Avatar, Icon } from '@react-native-material/core';
import { SafeAreaView, ScrollView } from 'react-native';
import { stringToColour } from '../../util/ColorGeneratorUtil';
import ContactController from '../../controllers/ContactController';

function BlockedScreen() {
  const [contactList, setContactList] = useState<User[]>();

  const { data, isLoading, isSuccess, error, refetch } = useQuery<User[]>(
    () => ContactController.fetchblocked(),
    {
      onSuccess: (data) => {
        setContactList(data);
      },
    }
  );

  // function addContact(user_id: number) {
  //   ContactServices.addContact(user_id).then((result) => {
  //     result?.ok ? setContactList(contactList) : alert(result);
  //   });
  // }

  // function addToBlock(user_id: number) {
  //   ContactServices.addContact(user_id).then((result) => {
  //     result?.ok ? setContactList(contactList) : alert(result);
  //   });
  // }

  if (isLoading) {
    return <IsLoadingIndicator />;
  } else {
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

export default BlockedScreen;
