import React, { useState, Fragment } from 'react';
// import { useRoute } from '@react-navigation/native';
// import { UserContext } from '../../context/user.context';
import { SafeAreaView, ScrollView} from 'react-native';
import ContactServices from '../../services/contact.services';
// import ContactListComponent from '../../components/contact.list.component';
import IsLoadingIndicator from '../../components/utils/isLoadingIndicator.component';
import { User } from '../../types/api.schema.types';
import useQuery from '../../hooks/useQuery';
import { Avatar, ListItem } from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { stringToColour } from '../../util/utilities';

function ContactsScreen() {
  // const current_user = useContext(UserContext);
  // const route = useRoute();

  const [contactList, setContactList] = useState<User[]>();

  const { data, isLoading, isSuccess, error, refetch } = useQuery<User[]>(
    () => ContactServices.fetchContacts(),
    {
      onSuccess: (data) => {
        setContactList(data);
      },
    }
  );

  function addContact(user_id: number) {
    ContactServices.addContact(user_id).then((result) => {
      if (result) {
        refetch();
      } else {
        alert('Unable to add user to contact');
      }
    });
  }

  function addToBlock(user_id: number) {
    ContactServices.addContact(user_id).then((result) => {
      if (result && result.ok) {
        refetch();
      } else {
        alert('Unable to add user to contact');
      }
    });
  }

  //TODO: Use Composition instead of this mess
  if (isLoading) {
    return <IsLoadingIndicator />;
  } else {
    if (isSuccess && contactList) {
      // return ContactListComponent(contactList);
      return (
        <SafeAreaView>
          <ScrollView>
            {contactList.map((contact, key) => {
              const name = `${contact.first_name} ${contact.last_name}`;
              const email = `${contact.email}`;

              return (
                <Fragment key={key}>
                  {
                    <ListItem
                      leadingMode="avatar"
                      leading={
                        <Avatar label={name} color={`${stringToColour(name + email)}`} />
                      }
                      title={name}
                      secondaryText={email}
                      trailing={(props) => <Icon name="chevron-right" {...props} />}
                      //TODO: remove contact or block
                      onPress={() => alert(`Go to ${name}'s profile?`)}
                    />
                  }
                </Fragment>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return <></>;
    }
  }
}

export default ContactsScreen;
