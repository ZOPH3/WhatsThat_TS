import React, { useEffect, useContext, useState, Fragment } from 'react';
import { useRoute } from '@react-navigation/native';
import { UserContext } from '../../context/user.context';
import { Text } from 'react-native';
import ContactServices from '../../services/contact.services';
import ContactListComponent from '../../components/contact.list.component';
import IsLoadingIndicator from '../../components/utils/isLoadingIndicator.component';
import { User } from '../../types/api.schema.types';

function ContactsScreen() {
  const current_user = useContext(UserContext);
  const route = useRoute();

  const [isLoading, setIsLoading] = useState(true);
  const [contactList, setContactList] = useState<User[]>();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    function fetchContactList() {
      const result = ContactServices.fetchContacts().then(
        (response) => response,
        (err) => err
      );
      return result;
    }

    fetchContactList()
      .then(
        (contacts) => {
          console.log('CONTACTS', contacts.result);
          setContactList(contacts.result);
          setIsSuccess(true);
        },
        (err) => {
          setIsSuccess(false);
        }
      )
      .finally(() => setIsLoading(false));
  }, []);

  function addContact(user_id: number) {
    //Check if theyre in list already
    // MessageServices.sendMessage(chat_id, userInput).then((result) => {
    //     result.status?  setMessageList(messageList?.concat(new_message)) : alert(result.message);
    // })
    ContactServices.addContact(user_id).then((result) => {
      result && result.ok ? setContactList(contactList) : alert("Unable to add user to contact");
    });
  }

  function addToBlock(user_id: number) {
    ContactServices.addContact(user_id).then((result) => {
      result && result.ok ? setContactList(contactList) : alert("Unable to add user to block list");
    });
  }

  if (isLoading) {
    return <IsLoadingIndicator />;
  } else {
    if (isSuccess && contactList) {
      return ContactListComponent(contactList);
    } else {
      return <></>
    }
  } 
}

export default ContactsScreen;
