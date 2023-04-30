import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import EmptyScreen from "../screens/EmptyScreen";

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="ep" component={EmptyScreen} />
            <Drawer.Screen name="Notifications" component={EmptyScreen} />
        </Drawer.Navigator>
    );
}