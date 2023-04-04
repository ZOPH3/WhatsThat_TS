import React from "react";
import { ListItem, Avatar, Stack, Button, Badge, TextInput, Box, IconButton } from "@react-native-material/core";
import { Alert, Pressable, View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const Message = (props: { message: string, date: string, isSelf: boolean }) => {
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
        <TouchableOpacity style={[props.isSelf ? styles.self : styles.others]}>
            <View onTouchStart={() => Alert.alert(props.date)} >
                <Text style={{ fontSize: 16, color: "#fff", }}> {props.message}</Text>
            </View>
        </TouchableOpacity>
    </>

}

const Chat = () => (
    <>
        <View style={styles.containerMain}>
            <SafeAreaView style={styles.container}>
                <Text> Main Content Here</Text>
                <ScrollView style={styles.scrollView}>
                    <Message message='Hellossssssssssssssssssssssssssssssssssssssssssssssssssssssssss' date='he' isSelf={true} />
                    <Message message='Hello' date='1' isSelf={true} />
                    <Message message='Hello' date='2' isSelf={false} />
                    <Message message='Hello' date='3' isSelf={false} />
                    <Message message='Hello' date='he' isSelf={true} />
                    <Message message='Hello' date='he' isSelf={true} />
                    <Message message='Hello' date='he' isSelf={false} />
                    <Message message='Hello' date='he' isSelf={false} />
                    <Message message='Hello' date='he' isSelf={true} />
                    <Message message='Hello' date='he' isSelf={true} />
                    <Message message='Hello' date='he' isSelf={false} />
                    <Message message='Hello' date='he' isSelf={false} />
                    <Message message='Hello' date='he' isSelf={true} />
                    <Message message='Hello' date='he' isSelf={true} />
                    <Message message='Hello' date='he' isSelf={false} />
                    <Message message='Hello' date='he' isSelf={false} />
                    <Message message='Hello' date='he' isSelf={true} />
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
                    }} title=">>>" /></View>
            </View>
        </View>
    </>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        marginHorizontal: 20,
    },
    text: {
        fontSize: 42,
    },
    containerMain: {
        flex: 1,
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
        // marginTop: 6,
        bottom: 1,
    },
    textStyle: {
        color: '#fff',
        fontSize: 18,
    },
});

// export default App;