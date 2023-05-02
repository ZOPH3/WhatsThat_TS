// import { Camera, CameraType, onCameraReady, CameraPictureOptions } from 'expo-camera';
// import React from 'react';
// import { useState } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function CameraTakePicture() {
//     const [type, setType] = useState(CameraType.back);
//     const [permission, requestPermission] = Camera.useCameraPermissions();
//     const [camera, setCamera] = useState(null);

//     function toggleCameraType(){
//         setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
//         console.log("Camera: ", type)
//     }

//     async function takePhoto(){
//         if(camera){
//             const options = {quality: 0.5, base64: true}
//             const data = await camera.takePictureAsync(options)

//             console.log(data.uri)
//         }
      
//     }

//     if(!permission || !permission.granted){
//         return (<Text>No access to camera</Text>)
//     }else{
//         return (
//             <View style={styles.container}>
//                 <Camera style={styles.camera} type={type} ref={ref => setCamera(ref)}>
//                     <View style={styles.buttonContainer}>
//                         <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
//                             <Text style={styles.text}>Flip Camera</Text>
//                         </TouchableOpacity>
//                     </View>

//                     <View style={styles.buttonContainer}>
//                         <TouchableOpacity style={styles.button} onPress={takePhoto}>
//                             <Text style={styles.text}>Take Photo</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </Camera>
//             </View>
//         );
//     }  
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     buttonContainer: {
//         alignSelf: 'flex-end',
//         padding: 5,
//         margin: 5,
//         backgroundColor: 'steelblue'
//     },
//     button: {
//         width: '100%',
//         height: '100%'
//     },
//     text: {
//         fontSize: 14,
//         fontWeight: 'bold',
//         color: '#ddd'
//     }
// })