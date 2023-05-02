import { Button } from '@react-native-material/core';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/user.context';
import IOController from '../controllers/io.controller';

function Uploader() {
    const user = useContext(UserContext);
    const [uploadFile, setFileImage] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);


    const handlePicker = async () => {
        setIsLoading(true);
        
        const result = await IOController.pickFile();

        console.log(result)
    }

    const handleUploader = async () => {
        setIsLoading(true);
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

    return <Button title={uploadFile !== undefined ? "Confirm" : "Upload"} onPress={() =>
        handlePicker()
    } />
}

export default Uploader;