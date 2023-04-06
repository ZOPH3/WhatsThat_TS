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

const ListItemComponent = (props: {
    message: {
        "title": string,
        "preview": string,
        "chat_id": number,
        "user_name": string,
        "isUnread": boolean
    }

}) => {
    const navigation = useNavigation();
    return <>
        <ListItem
            leadingMode="avatar"
            leading={
                <Avatar label={props.message.title != "" ? props.message.title : props.message.user_name} autoColor />
            }
            title={props.message.title != "" ? props.message.title : props.message.user_name}
            secondaryText={props.message.preview}
            trailing={isUnread(props.message.isUnread)}
            onPress={() => { 
                navigation.push('Chat', {
                    title: props.message.title != "" ? props.message.title : props.message.user_name,
                    chat_id: props.message.chat_id
                  })
            }}
        />
    </>
}

export default ListItemComponent;