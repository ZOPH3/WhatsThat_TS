import React from "react";
import { Stack } from "@react-native-material/core";
import { Pressable, ScrollView } from "react-native";
import ListItemComponent from "./ListItemComponent";

function generateList(messages: []) {

    return messages.map((message, key) => {
        return <>
            <Pressable>
                <ListItemComponent key={key} message={message} />
            </Pressable>
        </>
    })
}

const ChatListHomeComponent = (props: { messages: [] }) => (
    <>
        <Stack>
            <ScrollView>
                {generateList(props.messages)}
            </ScrollView>
        </Stack>
    </>
);


export default ChatListHomeComponent;