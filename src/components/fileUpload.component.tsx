import { Button } from '@react-native-material/core';
// import * as DocumentPicker from 'expo-document-picker';
// import * as ExpoFileSystem from 'expo-file-system'
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/user.context';
import IOServices from '../services/io.services';

import {launchImageLibrary} from 'react-native-image-picker';

function FileUploader() {
    const user = useContext(UserContext);
    const [uploadFile, setFileImage] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const readFile = async (uri: string) => {
        const fileContent = await ExpoFileSystem.readAsStringAsync(uri, {encoding: "base64"});

        console.log("CONTENT", fileContent);

        return fileContent;
    }

    const handlePicker = async () => {
        setIsLoading(true);
        // return DocumentPicker.getDocumentAsync({ multiple: false, copyToCacheDirectory: false, type: ["image/png", "image/jpeg", "image/*"] })
        //     .then((result) => {
        //         if (result.type === "success") {
        //             setFileImage(result)
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     }).then((result) => { 
        //         setIsLoading(false);
        //         return result;
        //     })
        const result = await launchImageLibrary({mediaType: "photo","includeBase64": true});

        console.log(result)
    }

    const handleUploader = async () => {
        setIsLoading(true);
        let result = null;
        if (uploadFile !== undefined && uploadFile.type === "success" && uploadFile.mimeType) {
            console.log("PLEASE FUCKIGN WORK", await readFile(uploadFile.uri));
            result = await IOServices.upload(user.user.user_id, uploadFile);
        }
        
        if (result) {
            setIsLoading(false);
            return true;
        } else {
            setIsLoading(false);
            return false;
        }
    }


    // useEffect(() => {
    //     const loadImage = async () => {
    //         const result = await handlePicker();
    //         if (result !== null) {
    //             const type = result.mimeType;
    //         }

    //     };
    //     loadImage().then(setTakenImages);
    // }, []);



    return <Button title={uploadFile !== undefined? "Confirm" : "Upload"} onPress={() => {
        uploadFile !== undefined? handleUploader() : handlePicker()
    }} />
}

export default FileUploader;