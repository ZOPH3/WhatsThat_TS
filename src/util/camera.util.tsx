import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera, CameraCapturedPicture, CameraPictureOptions, PermissionResponse } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import React from "react";

export default function cameraHelper() {
  const [cameraRef, setCameraRef] = useState<Camera | null>();

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean>();
  const [photo, setPhoto] = useState<CameraCapturedPicture>();

  useEffect(() => {
    const fetchPermissions = async () => {
      console.log("Fetching permissions...");

      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.granted);
      setHasMediaLibraryPermission(mediaLibraryPermission.granted);

    }

    fetchPermissions();

  }, [])

  if (hasCameraPermission === undefined) {
    return <Text>No camera permissions</Text>
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  const takePic = async () => {
    const options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    if (cameraRef) {
      const newPhoto = await cameraRef.takePictureAsync(options);
      setPhoto(newPhoto);
    }
  };

  if (photo) {
    const sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    const savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? (
          <Button title="Save" onPress={savePhoto} />
        ) : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={ref => {
      setCameraRef(ref)}} >
      <View style={styles.buttonContainer}>
        <Button title="Take Pic" onPress={takePic} />
      </View>
      <StatusBar style="auto" />
    </ Camera>
      );
}

      const styles = StyleSheet.create({
        container: {
        flex: 1,
      alignItems: "center",
      justifyContent: "center",
  },
      buttonContainer: {
        backgroundColor: "#fff",
      alignSelf: "flex-end",
  },
      preview: {
        alignSelf: "stretch",
      flex: 1,
  },
});
