import React, { useEffect, useContext, useState, Fragment } from "react";
import { useRoute } from '@react-navigation/native';
import { UserContext } from "../../context/user.context";
import { Text } from "react-native";
import ContactServices from "../../services/contact.services";
import UserType from "../../util/types/user.type";
import ContactListComponent from "../../components/contact.list.component";

function ContactsScreen() {
    const current_user = useContext(UserContext);
    const route = useRoute();

    const [isLoading, setIsLoading] = useState(true);
    const [contactList, setContactList] = useState<UserType[]>();
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        function fetchContactList() {
            const result = ContactServices.fetchContacts().then(
                (response) => response,
                (err) => err
            )
            return result;
        }

        fetchContactList().then((contacts) => {
            console.log("CONTACTS", contacts.result)
            setContactList(contacts.result);
            setIsSuccess(true);
        },
            (err) => {
                setIsSuccess(false);
            }).finally(() => setIsLoading(false))
    }, [])

    function addContact(user_id: number) {
        //Check if theyre in list already
        // MessageServices.sendMessage(chat_id, userInput).then((result) => {
        //     result.status?  setMessageList(messageList?.concat(new_message)) : alert(result.message);
        // })
        ContactServices.addContact(user_id).then((result) => {
            result.status ? setContactList(contactList) : alert(result.message);
        })
    }

    function addToBlock(user_id: number) {
        ContactServices.addContact(user_id).then((result) => {
            result.status ? setContactList(contactList) : alert(result.message);
        })
    }

    if (isLoading) {
        return <>
            <Text>Loading.....</Text>
        </>
    } else {
        if (isSuccess && contactList) {
            return ContactListComponent(contactList)
        }
    }
}


export default ContactsScreen;