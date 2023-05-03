import { Button } from '@react-native-material/core';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/user.context';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

function Uploader() {
    // const user = useContext(UserContext);
    // const [isLoading, setIsLoading] = useState(false);

    // const [hasCameraPermission, setHasCameraPermission] = Camera.useCameraPermissions();
    // const [type, setType] = useState<CameraType>(CameraType.back);
    // const [camera, setCamera] = useState(null);
    // const [image, setImage] = useState(null);
    // // Camera.Constants.Type.back
    

    // useEffect(() => {
    //     (async () => {
    //         const cameraStatus = await Camera.requestCameraPermissionsAsync();
    //         setHasCameraPermission(cameraStatus.granted);
    //     })();
    // }, []);

    // const takePicture = async () => {
    //     if(camera){
    //         const data = await camera.takePictureAsync(null)
    //         setImage(data.uri);
    //     }
    //   }
    //  if (hasCameraPermission === false) {
    //     return <Text>No access to camera</Text>;
    //   }

    // return <Button title={"Confirm"} onPress={ } />
}

export default Uploader;