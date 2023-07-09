import React, { useEffect, useState } from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Camera, CameraCapturedPicture, CameraType, ImageType } from 'expo-camera';

function CameraComponent(props: { trigger: (data: CameraCapturedPicture) => void }) {
  const { trigger } = props;
  const [showCamera, setShowCamera] = useState(false);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  /**
   * @description - This useEffect is used to request for camera permission
   */
  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, []);

  const setModalVisible = () => setShowCamera(false);

  const takePicture = async () => {
    if (camera) {
      const data = (await camera.takePictureAsync({
        base64: true,
        imageType: ImageType.png,
        onPictureSaved: (data) => trigger(data),
      })) as CameraCapturedPicture;
      setModalVisible();
      if (!data || !data.base64) return;
      // console.log(data.base64);
      setImage(`${data.base64}`);
    }
  };
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
            ratio="4:3"
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
                    setType(type === CameraType.back ? CameraType.front : CameraType.back);
                  }}
                >
                  {type === CameraType.back ? 'Front' : 'Back '}
                </Button>
              </View>
            </View>
          </Camera>
        </Modal>
      )}
      <View>
        {!!permission && (
          <View>
            <Button
              mode="outlined"
              icon="camera"
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
