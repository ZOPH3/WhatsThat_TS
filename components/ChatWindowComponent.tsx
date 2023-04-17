import React, { useEffect, useState } from "react";
import { ListItem, Avatar, Stack, Button, Badge, TextInput, Box, IconButton } from "@react-native-material/core";
import { Alert, Pressable, View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import ChatService from "../core/services/chat.services";
import MessageBubbleComponent from "./MessageBubbleComponent";

//FIXME: Needs to get the current user
const current_user = 1

// type ChatInfoType = {

//     "name": string,
//     "creator": {
//         "user_id": number,
//         "first_name": string,
//         "last_name": string,
//         "email": string
//     },
//     "members": [
//         {
//             "user_id": number,
//             "first_name": string,
//             "last_name": string,
//             "email": string
//         }
//     ],
//     "messages": [
//         {
//             "message_id": number,
//             "timestamp": number,
//             "message": string,
//             "author": {
//                 "user_id": number,
//                 "first_name": string,
//                 "last_name": string,
//                 "email": string
//             }
//         }
//     ]
// }

type ChatInfoType = {
    "name": string,
    "creator": {},
    "members": [],
    "messages"?: []
}

type MessageType = {
    "message_id": number,
    "timestamp": number,
    "message": string,
    "author": {
        "user_id": number,
        "first_name": string,
        "last_name": string,
        "email": string
    }
}

const ChatWindowComponent = () => {

    const route = useRoute();
    const chat_id = route.params.chat_id;

    const [isLoading, setIsLoading] = useState(true);
    const [chatInfo, setChatInfo] = useState<ChatInfoType>();
    const [messageList, setMessageList] = useState<MessageType[]>();


    useEffect(() => {
        setMessageList(undefined);
        setIsLoading(true);


        const fetchData = async () => {

            console.log("Fetching Messages...")

            const data: ChatInfoType = await ChatService.getMessages(route.params.chat_id); 

            setChatInfo(data);
            setMessageList(data.messages);

            setIsLoading(false)
        }

        // call the function
        fetchData().catch(console.error);

    }, [])


    function getLastMessageId() {
        const m = (messageList.sort((a, b) => a.message_id - b.message_id))
        const last = m.findLast((message) => message.message_id != null)

        if (last != null) {
            let x = last.message_id + 1
            console.log(x)
            return x
        } else {
            return 0
        }
    }
    /// id: number, message: string
    function addMessage() {

        let id = getLastMessageId()

        if (id != 0) {

            let new_message = { message: 'Shure21544444444444', date: 'x', isSelf: true, message_id: id, from_id: 44 }

            console.log(new Date(1640013942 * 1000))

            setMessageList(messageList.concat(new_message))

        } else {

            let msg = 'Failed'
            Alert.alert(msg)
        }
    }

    const GenerateMessage = () => {

        if (messageList !== undefined) {
            return <>
                <View>
                    {messageList.map((messages, key) => {
                        return <>
                            {<MessageBubbleComponent
                                message_id={messages.message_id}
                                message={messages.message}
                                date={(messages.timestamp).toString()}
                                isSelf={messages.author.user_id === current_user}
                                from_id={messages.author.user_id}
                                position={key} />
                            }
                        </>
                    })}
                </View>
            </>
        }
        else {
            return <>
            <View></View>
            </>
        }
        // let messageList = props.messages;
    }

    if(isLoading){
        return <>
            <Text>Loading.....</Text>
        </>
    } else {
        return <>
        <View style={styles.containerMain}>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <GenerateMessage />
                </ScrollView>
            </SafeAreaView>

            <View style={styles.bottomView}>
                <View style={{ flexDirection: "row" }}>
                    <TextInput variant="outlined" style={{ flex: 3, padding: 2 }} trailing={props => (
                        <IconButton icon={props => <AntDesign name="addfile" {...props} />} {...props} />
                    )} />

                    <Button style={{
                        flex: 1, alignItems: 'center', justifyContent: 'center',
                        marginBottom: 6, marginLeft: 6
                    }} title=">>>" onPress={() => { addMessage() }} />
                </View>
            </View>
        </View>
    </>
    }
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: StatusBar.currentHeight,
    },
    scrollView: {

    },
    text: {
        fontSize: 42,
    },
    containerMain: {
        // flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomView: {
        width: '95%',
        // height: 50,
        // backgroundColor: '#EE5407',
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute',
        marginTop: 6,
        bottom: 1,
    },
    textStyle: {
        color: '#fff',
        fontSize: 18,
    },
});

export default ChatWindowComponent;