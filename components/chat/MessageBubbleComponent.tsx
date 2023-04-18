import React, { useEffect, useState } from "react";
import { ListItem, Avatar, Stack, Button, Badge, TextInput, Box, IconButton } from "@react-native-material/core";
import { Alert, Pressable, View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar } from "react-native";
import MessageType from "../../core/types/message.type";

const MessageBubbleComponent = (props: {
    message: MessageType,
    isSelf: boolean,
    position: number,
    triggerDelete: any
}) => {
    const styles = StyleSheet.create({
        self: {
            textAlign: 'right',
            backgroundColor: "#0078fe",
            padding: 10,
            marginLeft: '40%',
            marginTop: 5,
            marginRight: "5%",
            maxWidth: '55%',
            alignSelf: 'flex-end',
            borderRadius: 20,

        },
        others: {
            textAlign: 'left',
            backgroundColor: "#0078fe",
            padding: 10,
            marginLeft: '5%',
            marginTop: 5,
            marginRight: "40%",
            maxWidth: '55%',
            alignSelf: 'flex-start',
            borderRadius: 20,
        },
    })

    function removeMessage(message_id: number) {
        props.triggerDelete(message_id);
    }

    return <>
        <View key={props.message.message_id}>
            <TouchableOpacity style={[props.isSelf ? styles.self : styles.others]} onLongPress={() => removeMessage(props.message.message_id)}>
                <Text>{`${props.message.author.first_name} ${props.message.author.last_name}`}</Text>
                <View onTouchStart={() => console.log(props.message.timestamp)}>
                    <Text style={{ fontSize: 16, color: "#fff", }}> {props.message.message}</Text>
                </View>
            </TouchableOpacity>
        </View>
    </>
}

export default MessageBubbleComponent;