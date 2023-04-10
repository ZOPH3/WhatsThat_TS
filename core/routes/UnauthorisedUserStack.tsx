import React from "react";

export default function UnauthorisedUserStack(setIsLoggedIn : any, stack: any) {
    const Stack = stack

    return (
        <Stack.Group>
            <Stack.Screen name="SignInScreen" component={SignInScreen}
                initialParams={{ setIsLoggedIn: setIsLoggedIn }} />
        </Stack.Group>
    )
}