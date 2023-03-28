import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { MessageModel } from '../../core/interfaces/MessageModel';


const MessageComponent = (props: MessageModel) => {
    return <>
        <Text>Message: {props.msg}</Text>
    </>
}

export default MessageComponent;