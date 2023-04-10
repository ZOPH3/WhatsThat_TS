import React from "react";
import { TextInput } from 'react-native';

export default function InputChild(props: any) {
    return (
        <TextInput
            placeholder={props.placeholder}
            value={props.inputValue}
            onChange={(e) => props.onInputValueChange(e)} />
    );
}