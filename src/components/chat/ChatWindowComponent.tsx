import React, { useEffect, useState } from "react";
import { Button, TextInput, IconButton } from "@react-native-material/core";
import { Alert, View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";

import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

import MessageBubbleComponent from "./MessageBubbleComponent";
import MessageServices from "../../services/message.services";
import SingleChatType from "../../types/chat.type";
import MessageType from "../../types/message.type";

//FIXME: Needs to get the current user

const current_user = {
    user_id: 1,
    first_name: 'Ashlek',
    last_name: 'Williams',
    email: 'ashley.williams@mmu.ac.uk'
}

const ChatWindowComponent = () => {
    const route = useRoute();
    const chat_id = route.params.chat_id;

    const [isLoading, setIsLoading] = useState(true);
    // const [chatInfo, setChatInfo] = useState<ChatInfoType>();
    const [messageList, setMessageList] = useState<MessageType[]>();
    const [userInput, setUserInput] = useState("xyz");


    useEffect(() => {
        setMessageList(undefined);
        setIsLoading(true);


        const fetchData = async () => {

            console.log("Fetching Messages...");
            const data: SingleChatType = await MessageServices.getMessages(chat_id);

            setMessageList(data.messages);
            setIsLoading(false)
        }

        // call the function
        fetchData().catch(console.error);

    }, [])


    function getLastMessageId() {
        const m = (messageList?.sort((a, b) => a.message_id - b.message_id))
        const last = m?.findLast((message) => message.message_id != null)

        if (last != null) {
            const x = last.message_id + 1
            console.log("New Message ID...", x)
            return x
        } else {
            return 0
        }
    }
    /// id: number, message: string
    function addMessage() {

        let id = getLastMessageId()

        //TODO: Need to change the author

        if (id === 0) id = id + 1;

        const new_message = {
            message_id: id,
            timestamp: Date.now(),
            message: userInput,
            author: current_user
        }

        setMessageList(messageList?.concat(new_message))
    }

    function triggerDelete(id: number) {
        Alert.alert("Deleting", id.toString())

        const newList = messageList?.filter((message) => message.message_id !== id);
        setMessageList(newList);
    }

    const GenerateMessages = () => {

        if (messageList !== undefined) {
            return <>
                <View>
                    {messageList.map((message, key) => {
                        return <>
                            {<MessageBubbleComponent
                                message={message}
                                isSelf={message.author.user_id === current_user.user_id}
                                position={key++}
                                triggerDelete={triggerDelete} key={key} />
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

    if (isLoading) {
        return <>
            <Text>Loading.....</Text>
        </>
    } else {
        return <>
            <View style={styles.containerMain}>
                <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        <GenerateMessages />
                    </ScrollView>
                </SafeAreaView>

                <View style={styles.bottomView}>
                    <View style={{ flexDirection: "row" }}>
                        <TextInput value={userInput} onChangeText={(e) => setUserInput(e)} variant="outlined" style={{ flex: 3, padding: 2 }} trailing={props => (
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