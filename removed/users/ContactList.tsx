import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { UserModel } from '../../core/models/UserModel';
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
                    first_name={user.first_name}
                    last_name={user.last_name}
                    email={user.email}
                    password={user.password}
                    user_id={user.user_id}
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