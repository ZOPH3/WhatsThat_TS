import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { UserModel } from '../../core/interfaces/UserModel';

const UserComponent = (props: UserModel) => {
    return <>
        <Text>{props.firstname}</Text>
    </>
}

export default UserComponent;