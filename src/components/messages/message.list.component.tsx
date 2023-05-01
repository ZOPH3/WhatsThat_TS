import React, { Fragment, useEffect, useContext, useState } from "react";
import { Button, TextInput, IconButton } from "@react-native-material/core";
import { Alert, View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import IsLoadingIndicator from "../utils/isLoadingIndicator.component";

import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

import MessageBubbleComponent from "./message.item.component";
import MessageServices from "../../services/message.services";
import MessageType from "../../util/types/message.type";
import { UserContext } from "../../context/user.context";

//FIXME: Virtualized list provided a method to scroll to the bottom on the list, can use this to trigger when message is sent?
//FIXME: When messages are sent successfully, need to clear the TextInput, current method does not work.
//TODO: Use Refresh controlls and limit the fetch API to use the pagination and max messages returned, refresh controll can be used to return the next set of previous messages.
//TODO: Add a icon to the bar which will open a model component to add or remove a user from the messages? What happens when a user is removed though?

const ChatWindowComponent = () => {
    const current_user = useContext(UserContext).user;
    const route = useRoute();
    const chat_id = route.params.chat_id;

    const [isLoading, setIsLoading] = useState(true);
    const [messageList, setMessageList] = useState<MessageType[]>([]);
    const [userInput, setUserInput] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);


    useEffect(() => {
        setIsLoading(true);

        function fetchMessages() {
            const result = MessageServices.getMessage(chat_id).then(
                (response) => response,
                (err) => err
            )
            return result;
        }

        fetchMessages().then((messages) => {
            
            setMessageList(sortByDateTime(messages).reverse());
            setIsSuccess(true);
        },
            (err) => {
                setIsSuccess(false);
                console.log(err.status);
            }).finally(() => setIsLoading(false))
    }, [])

    function sortByDateTime(messageList: MessageType[]){
        return messageList.sort(function(a,b){
            return new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf();
          });
    }
    
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

        let id = getLastMessageId();

        //TODO: Need to change the author

        if (id === 0) id = id + 1;

        const new_message: MessageType = {
            "message_id": id,
            "timestamp": Date.now(),
            "message": userInput,
            "author": current_user
        }
        
        // TODO: This works to send a message but its basic
        MessageServices.sendMessage(chat_id, userInput).then((result) => {
            if(result.status) {
                setMessageList([...messageList, new_message]);
                setUserInput("");
            } else {
                alert(result.message);
            }
        })
    }

    function triggerDelete(id: number) {
        Alert.alert("Deleting", id.toString())
        const newList = messageList?.filter((message) => message.message_id !== id);
        MessageServices.deleteMessage(chat_id, id).then((result) => {
            result.status?  setMessageList(newList) : alert(result.message);
        })
    }

    if (isLoading) {
        return <IsLoadingIndicator />
        
    } else {
        if (isSuccess && messageList) {
            return <>
                <View style={styles.containerMain}>
                    <SafeAreaView style={styles.container}>
                        <ScrollView style={styles.scrollView}>
                            {messageList.map((message, key) => {
                                return <Fragment key={key}>
                                    {<MessageBubbleComponent
                                        message={message}
                                        isSelf={message.author.user_id === current_user.user_id}
                                        position={message.message_id}
                                        triggerDelete={triggerDelete}
                                    />
                                    }
                                </Fragment>
                            })}
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
        } else {
            return <></>
        }
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10
        // paddingTop: StatusBar.currentHeight,
    },
    scrollView: {

    },
    text: {
        fontSize: 42,
    },
    containerMain: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomView: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 6,
        bottom: 1,
    },
    textStyle: {
        color: '#fff',
        fontSize: 18,
    },

});

export default ChatWindowComponent;