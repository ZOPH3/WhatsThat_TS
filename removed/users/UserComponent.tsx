import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { UserModel } from '../../core/models/UserModel';

const UserComponent = (props: UserModel) => {
    return <>
        <Text>{props.first_name}</Text>
    </>
}

export default UserComponent;