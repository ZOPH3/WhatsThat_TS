import React, { useEffect, useState } from "react";
import { ListItem, Avatar, Stack, Button, Badge, TextInput, Box, IconButton } from "@react-native-material/core";
import { Alert, Pressable, View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const current_user = 16

const mList = [
    { message: 'Hello my nam jeff', date: 'x', isSelf: false, message_id: 1, from_id: 44 }
]
const messagesListTest = [
    {
        chat_id: 1,
        message_list: [
            { message: 'Hello my nam chat 1', date: 'x', isSelf: false, message_id: 1, from_id: 44 },
            { message: 'I like patapon', date: 'x', isSelf: true, message_id: 2, from_id: 16 },
            { message: 'Raid shadow legends', date: 'x', isSelf: false, message_id: 3, from_id: 44 },
            { message: 'Jhintonic', date: 'x', isSelf: false, message_id: 4, from_id: 44 },
            { message: 'weeewoooweeoo', date: 'x', isSelf: false, message_id: 5, from_id: 44 },
            { message: 'Yall are rebarded', date: 'x', isSelf: false, message_id: 7, from_id: 44 },
            { message: 'Sims 2 is amazing', date: 'x', isSelf: true, message_id: 8, from_id: 16 },
            { message: 'ipod Mini', date: 'x', isSelf: true, message_id: 10, from_id: 16 },
            { message: 'Shure215', date: 'x', isSelf: false, message_id: 9, from_id: 44 },
        ]
    },
    {
        chat_id: 2,
        message_list: [
            { message: 'Hello my nam chat 2', date: 'x', isSelf: false, message_id: 1, from_id: 44 },
            { message: 'I like patapon', date: 'x', isSelf: true, message_id: 2, from_id: 16 },
            { message: 'Raid shadow legends', date: 'x', isSelf: false, message_id: 3, from_id: 44 },
            { message: 'Jhintonic', date: 'x', isSelf: false, message_id: 4, from_id: 44 },
            { message: 'weeewoooweeoo', date: 'x', isSelf: false, message_id: 5, from_id: 44 },
            { message: 'Yall are rebarded', date: 'x', isSelf: false, message_id: 7, from_id: 44 },
            { message: 'Sims 2 is amazing', date: 'x', isSelf: true, message_id: 8, from_id: 16 },
            { message: 'ipod Mini', date: 'x', isSelf: true, message_id: 10, from_id: 16 },
            { message: 'Shure215', date: 'x', isSelf: false, message_id: 9, from_id: 44 },
        ]
    },
    {
        chat_id: 3,
        message_list: [
            { message: 'Hello my nam chat 3', date: 'x', isSelf: false, message_id: 1, from_id: 44 },
            { message: 'I like patapon', date: 'x', isSelf: true, message_id: 2, from_id: 16 },
            { message: 'Raid shadow legends', date: 'x', isSelf: false, message_id: 3, from_id: 44 },
            { message: 'Jhintonic', date: 'x', isSelf: false, message_id: 4, from_id: 44 },
            { message: 'weeewoooweeoo', date: 'x', isSelf: false, message_id: 5, from_id: 44 },
            { message: 'Yall are rebarded', date: 'x', isSelf: false, message_id: 7, from_id: 44 },
            { message: 'Sims 2 is amazing', date: 'x', isSelf: true, message_id: 8, from_id: 16 },
            { message: 'ipod Mini', date: 'x', isSelf: true, message_id: 10, from_id: 16 },
            { message: 'Shure215', date: 'x', isSelf: false, message_id: 9, from_id: 44 },
        ]
    },
    {
        chat_id: 4,
        message_list: [
            { message: 'Hello my nam chat 4', date: 'x', isSelf: false, message_id: 1, from_id: 44 },
            { message: 'I like patapon', date: 'x', isSelf: true, message_id: 2, from_id: 16 },
            { message: 'Raid shadow legends', date: 'x', isSelf: false, message_id: 3, from_id: 44 },
            { message: 'Jhintonic', date: 'x', isSelf: false, message_id: 4, from_id: 44 },
            { message: 'weeewoooweeoo', date: 'x', isSelf: false, message_id: 5, from_id: 44 },
            { message: 'Yall are rebarded', date: 'x', isSelf: false, message_id: 7, from_id: 44 },
            { message: 'Sims 2 is amazing', date: 'x', isSelf: true, message_id: 8, from_id: 16 },
            { message: 'ipod Mini', date: 'x', isSelf: true, message_id: 10, from_id: 16 },
            { message: 'Shure215', date: 'x', isSelf: false, message_id: 9, from_id: 44 },
        ]
    }
]

function getMessageList(chat_id: number){
    return messagesListTest.filter((messageListTest) => messageListTest.chat_id === chat_id)[0].message_list
}

const ChatWindowComponent = () => {
    const route = useRoute();
    const [messageList, setMessageList] = useState(getMessageList(route.params.chat_id))

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

    function removeMessage(id: number, from_id: number) {
        let msg = 'Unable to delete'
        if (current_user === from_id) {
            let remaining = messageList.filter((message) => {
                return message.message_id != id
            })
            msg = 'Deleted'
            setMessageList(remaining)
        }
        //Alert.alert(msg)

        //TODO: Have a alert bar show up instead
    }

    const Message = (props: { message: string, from_id: number, isSelf: boolean, date: string, message_id: number, position: number }) => {
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

    const GenerateMessage = () => {
        return <>
            <View>
                {messageList.map((props, key) => {
                    return <>{<Message message_id={props.message_id} message={props.message} date={props.date} isSelf={props.isSelf} from_id={current_user} position={key}/>
                    }</>
                })}
            </View>
        </>
    }

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