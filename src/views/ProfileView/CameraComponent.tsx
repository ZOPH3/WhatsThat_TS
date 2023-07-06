import React, { useEffect, useState } from 'react';
import { View, Image, Modal, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Camera, CameraType } from 'expo-camera';

function CameraComponent() {
  const [image, setImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [camera, setCamera] = useState<Camera | null>(null);

  const [type, setType] = useState<CameraType>(CameraType.back);
  const [imageUri, setImageUri] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync({ base64: true });
      if (!data || !data.uri) return;
      console.log('data', data);
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
