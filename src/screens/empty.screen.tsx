/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppBar, Button } from '@react-native-material/core';
import React from 'react';

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