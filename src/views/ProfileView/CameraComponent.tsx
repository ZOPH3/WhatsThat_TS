import React, { useEffect, useState } from 'react';
import { View, Image, Modal, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Camera } from 'expo-camera';

function CameraComponent() {
  const [image, setImage] = useState(undefined);
  const [showCamera, setShowCamera] = useState(false);
  const [camera, setCamera] = useState(null);
  //   const [cameraPermission, setCameraPermission] = useState('undetermined');
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [imageUri, setImageUri] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  //   const permisionFunction = async () => {
  //     const c = await Camera.requestCameraPermissionsAsync();
  //     setCameraPermission(c.status);

  //     if (cameraPermission === 'denied' || cameraPermission === 'undetermined') {
  //       console.log('Permission for media access needed.');
  //     }
  //   };

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data);
      setImageUri(data.uri);
    }
  };

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, []);

  const setModalVisible = () => setShowCamera(false);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission}>grant permission</Button>
      </View>
    );
  }

  return (
    <View>
      {showCamera && (
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
      )}
      <View>
        <View>
          {!!image && (
            <Image source={{ uri: image }} style={{ width: 120, height: 120, borderRadius: 100 }} />
          )}
        </View>
        {!!permission && (
          <View>
            <Button
              icon="camera"
              mode="contained"
              onPress={() => {
                console.log(permission);
              }}
            >
              Camera
            </Button>
            <Button
              icon="camera"
              mode="contained"
              onPress={() => {
                setShowCamera(true);
              }}
            >
              Camera
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}

export default CameraComponent;
