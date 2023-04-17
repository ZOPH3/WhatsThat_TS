import React from "react";
import { ListItem, Avatar, Chip } from "@react-native-material/core";
// import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';


function isUnread(isUnread: boolean) {
    if (isUnread) {
        return (<Chip label="Filled" color="primary" />)
    } else {
        return <></>
    }
}

//TODO: isUnread is determined by the time of the last message and when the user last opened the message (which would be saved to the state).

const ListItemComponent = (props: {
    // message: {
    //     "title": string,
    //     "preview": string,
    //     "chat_id": number,
    //     "user_name": string,
    //     "isUnread": boolean
    // }

    message: {
        "chat_id": number,
        "creator": {
            "email": string,
            "first_name": string,
            "last_name": string,
            "user_id": number
        },
        "last_message": {
            "author": {},
            "message": string,
            "message_id": number,
            "timestamp": number
        },
        "name": string
    },

}) => {
    const navigation = useNavigation();
    return <>
        <ListItem
            leadingMode="avatar"
            leading={
                <Avatar label={props.message.name != "" ? props.message.name : props.message.creator.first_name} autoColor />
            }
            title={props.message.name != "" ? props.message.name : props.message.creator.first_name}
            secondaryText={props.message.last_message.message}
            trailing={isUnread(true)}
            onPress={() => { 
                navigation.push('Chat', {
                    title: props.message.name != "" ? props.message.name : props.message.creator.first_name,
                    chat_id: props.message.chat_id
                  })
            }}
        />
    </>
}

export default ListItemComponent;