import React, { useState, Fragment } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import ContactServices from '../../services/contact.services';
import IsLoadingIndicator from '../../components/utils/isLoadingIndicator.component';
import { User } from '../../types/api.schema.types';
import useQuery, { State } from '../../hooks/useQuery';
import { Avatar, Button, ListItem, TextInput } from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { stringToColour } from '../../util/utilities';
import { SearchParams } from '../../util/url.builder';

function AddContactScreen() {
  // const current_user = useContext(UserContext);
  // const route = useRoute();

  const initialParams: SearchParams = {
    q: '',
    search_in: 'all',
  };

  //   const [contactList, setContactList] = useState<User[]>();
  const [params, setParams] = useState<SearchParams>(initialParams);
  const [state, setState] = useState<State<User[]>>({
    data: undefined,
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: '',
  });

  //   const { data, isLoading, isSuccess, error, refetch } =

  function findUser(q: string) {
    ContactServices.search({ q: q }).then((response) => {
      setState({
        data: response,
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: '',
      });
    }).catch((error) => {
        setState({
            data: undefined,
            isLoading: false,
            isSuccess: false,
            isError: true,
            error: 'Error finding users...',
          });
    });
  }

  function addContact(user_id: number) {
    // ContactServices.addContact(user_id).then((result) => {
    //   if (result) {
    //     refetch();
    //   } else {
    //     alert('Unable to add user to contact');
    //   }
    // });
  }

  //TODO: Use Composition instead of this mess
  return (
    <View>
      <TextInput placeholder="Enter user..." onChangeText={(e) => findUser(e)} />

      {state.isLoading ? (
        <IsLoadingIndicator />
      ) : (
        <>
          {state.data ? (
            <SafeAreaView>
              <ScrollView>
                {state.data.map((contact, key) => {
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
          ) : (
            <></>
          )}
        </>
      )}
    </View>
  );
}

export default AddContactScreen;
