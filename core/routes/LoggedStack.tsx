import React from "react";

export default function LoggedStack(stack : any) {
    const Stack = stack

    return (
        <Stack.Group>
            <Stack.Screen name="Home"
                component={HomeScreen} options={{
                    gestureEnabled: false,
                    headerShown: true,
                    headerLeft: () => <></>
                }}
            />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} options={({ route }) => ({
                title: route.params.title,
                chat_id: route.params.chat_id
            })}
            />
        </Stack.Group>
    )
}