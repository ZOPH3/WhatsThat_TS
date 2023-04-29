import React from "react";
import { ListItem, Avatar, Chip } from "@react-native-material/core";
import { useNavigation } from '@react-navigation/native';
import ChatInfoType from "../../util/types/chatinfo.type";


function isUnread(isUnread: boolean) {
    if (isUnread) {
        return (<Chip label="Filled" color="primary" />)
    } else {
        return <></>
    }
}

//TODO: isUnread is determined by the time of the last message and when the user last opened the message (which would be saved to the state).

/**
 * Home screen chat list
 */

const ListItemComponent = (props: { key: number, message: ChatInfoType }) => {

    const navigation = useNavigation();

    return <>
        <ListItem
            leadingMode="avatar"
            leading={
                <Avatar label={
                    props.message.name != "" 
                    ? props.message.name.concat(props.message.creator.first_name) : props.message.creator.first_name}
                    autoColor
                />
            }
            title={props.message.name != "" 
            ? props.message.name : props.message.creator.first_name}

            secondaryText={props.message.last_message?.message}
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