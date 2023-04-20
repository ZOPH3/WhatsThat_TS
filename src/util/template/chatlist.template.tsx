import React from "react";
import { ListItem, Avatar, Stack, Button, Badge } from "@react-native-material/core";
import { Alert, Pressable, View, Text } from "react-native";

const ChatListStatic = () => (
  <>
    <Stack>
      <ListItem
        leadingMode="avatar"
        leading={
          <Avatar image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }} />
        }
        title="Brunch this weekend?"
        secondaryText="I'll be in your neighborhood doing errands this…"
        trailing={() => <Badge label={4} color="primary" />}
        onPress={() => {Alert.alert("Hello"); console.log("hello")}}
      />
      <ListItem
        leadingMode="avatar"
        leading={
          <Avatar image={{ uri: "https://mui.com/static/images/avatar/2.jpg" }} />
        }
        title="Summer BBQ"
        secondaryText="Wish I could come, but I'm out of town this…"
        trailing={() => <Badge label={4} color="primary" />}
      />
      <Pressable onPress={() => {console.log("Clicked")}}>
        <ListItem
          leadingMode="avatar"
          leading={
            <Avatar image={{ uri: "https://mui.com/static/images/avatar/3.jpg" }} />
          }
          title="Oui Oui"
          secondaryText="Do you have Paris recommendations? Have you ever…"
          trailing={() => <Badge label={1} />}
        />
      </Pressable>
    </Stack>
  </>
);

// <Badge label={123} color="primary" />

export default ChatListStatic;