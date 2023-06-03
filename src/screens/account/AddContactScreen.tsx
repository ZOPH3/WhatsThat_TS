import React, { useState, Fragment } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import IsLoadingIndicator from '../../components/utils/LoadingIndicator';
import { TUser } from '../../types/TSchema';
import { State } from '../../hooks/UseQueryHook';
import { Avatar, ListItem, TextInput } from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { stringToColour } from '../../util/ColorGeneratorUtil';
import ContactController, { TSearchParams } from '../../controllers/ContactController';

function AddContactScreen() {
  const initialParams: TSearchParams = {
    q: '',
    search_in: 'all',
  };

  const [params, setParams] = useState<TSearchParams>(initialParams);
  const [state, setState] = useState<State<TUser[]>>({
    data: undefined,
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: '',
  });

  function findUser(q: string) {
    ContactController().searchUsers({ q: q })
      .then((response) => {
        setState({
          data: response,
          isLoading: false,
          isSuccess: true,
          isError: false,
          error: '',
        });
      })
      .catch((error) => {
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
