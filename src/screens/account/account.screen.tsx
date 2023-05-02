import React, { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { View } from "react-native";
import { Button, Stack, Text } from "@react-native-material/core";
import FileUploader from "../../components/fileUpload.component";


function ProfileScreen() {
    const user = useContext(UserContext);

    return (
        <View>
            <Stack m={4} spacing={4}>
                <Text variant="h4">Hi! {user.user.first_name} {user.user.last_name} </Text>
                <Text variant="h6">Email:</Text>
                <Text variant="subtitle1">{user.user.email}</Text>
                <Button title="Upload profile picture"/>
                <FileUploader />
            </Stack>
        </View>
    )
}

export default ProfileScreen;