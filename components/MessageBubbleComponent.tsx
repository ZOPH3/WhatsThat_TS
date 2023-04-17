import React, { useEffect, useState } from "react";
import { ListItem, Avatar, Stack, Button, Badge, TextInput, Box, IconButton } from "@react-native-material/core";
import { Alert, Pressable, View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar } from "react-native";

function removeMessage(id: number, from_id: number) {
    // let msg = 'Unable to delete'
    // if (current_user === from_id) {
    //     let remaining = messageList.filter((message) => {
    //         return message.message_id != id
    //     })
    //     msg = 'Deleted'
    //     setMessageList(remaining)
    // }


    //TODO: Have a alert bar show up instead
}

const MessageBubbleComponent = (props: { 
    message: string, 
    from_id: number, 
    isSelf: boolean, 
    date: string, 
    message_id: number, 
    position: number 
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
    
    return <>
        <View key={props.message_id}>
            <TouchableOpacity style={[props.isSelf ? styles.self : styles.others]} onLongPress={() => removeMessage(props.message_id, props.from_id)}>
                <Text>{props.from_id}</Text>
                <View onTouchStart={() => console.log(props.date)}>
                    <Text style={{ fontSize: 16, color: "#fff", }}> {props.message}</Text>
                </View>
            </TouchableOpacity>
        </View>
    </>
}

export default MessageBubbleComponent;