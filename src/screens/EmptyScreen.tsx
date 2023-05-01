import { AppBar, Button, FAB, IconButton, Text } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function EmptyScreen() {

    return <>
        <AppBar
            variant="bottom"
            color="pink"
            leading={props => (
                <Button variant="text" title="Contact List" />
            )}
            trailing={props => (
                <Button variant="text" title="Blocked List" />
            )}
            style={{ position: "absolute", start: 0, end: 0, bottom: 0 }}
        >
        </AppBar>
    </>;
}

export default EmptyScreen;