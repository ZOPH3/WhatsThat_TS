import React, { useState, useEffect } from 'react';
import { Modal, TouchableOpacity, View, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { Button } from 'react-native-paper';

export default function CameraModule(props) {
  // const [cameraPermission, setCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const { showModal, setModalVisible, setImage } = props;
  const [type, setType] = useState(Camera.Constants.Type.back);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data);
      console.log(data.uri);
      setImageUri(data.uri);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible
      onRequestClose={() => {
        setModalVisible();
      }}
    >
      <Camera
        style={{ flex: 1 }}
        ratio="16:9"
        flashMode={Camera.Constants.FlashMode.on}
        type={type}
        ref={(ref) => {
          setCamera(ref);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              backgroundColor: 'black',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Button
              icon="close"
              style={{ marginLeft: 12 }}
              mode="outlined"
              color="white"
              onPress={() => {
                setModalVisible();
                console.log('close');
              }}
            >
              Close
            </Button>
            <TouchableOpacity
              onPress={async () => {
                takePicture();
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 50,
                  borderColor: 'white',
                  height: 50,
                  width: 50,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 16,
                  marginTop: 16,
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 50,
                    borderColor: 'white',
                    height: 40,
                    width: 40,
                    backgroundColor: 'white',
                  }}
                />
              </View>
            </TouchableOpacity>
            <Button
              icon="axis-z-rotate-clockwise"
              style={{ marginRight: 12 }}
              mode="outlined"
              color="white"
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              {type === Camera.Constants.Type.back ? 'Front' : 'Back '}
            </Button>
          </View>
        </View>
      </Camera>
    </Modal>
  );
}
