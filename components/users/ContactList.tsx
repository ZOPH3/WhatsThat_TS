import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { UserModel } from '../../core/interfaces/UserModel';
import UserComponent from './UserComponent';


export type ContactListState = {
    users: Array<UserModel>,
    isLoaded: boolean
}

const ContactList = (props: ContactListState) => {
    if (props.isLoaded) {
        let i = 1;
        return <>
            {props.users.map(user =>
                <UserComponent
                    key={i++}
                    firstname={user.firstname}
                    lastname={user.lastname}
                    email={user.email}
                    password={user.password}
                    id={user.id}
                />
            )}
        </>
    } else {
        return <>
            <Text>No Contacts</Text>
        </>
    }
}

export default ContactList;