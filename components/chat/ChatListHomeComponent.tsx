import React from "react";
import { Stack } from "@react-native-material/core";
import { Pressable } from "react-native";
import ListItemComponent from "./ListItemComponent";

function generateList(messages : []){

    return messages.map((message, key) => {
        return <>
            <Pressable>
                <ListItemComponent key={key++} message={message} />
            </Pressable>
        </>
    })
}
const ChatListHomeComponent = (props : {messages : []}) => (
  <>
    <Stack>
        {generateList(props.messages)}
    </Stack>
  </>
);


export default ChatListHomeComponent;