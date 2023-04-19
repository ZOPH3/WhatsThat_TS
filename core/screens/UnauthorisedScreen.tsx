import React from "react";
import { Button, View } from 'react-native';

import ApiUserClient from "../api/ApiUserClient";
import AsyncStorageHelper from "../storage/asyncStorage.helper";
import { AsyncStorageKey } from "../storage/AsyncStorageKey";

const UserApi = new ApiUserClient('http://10.0.2.2:3333/api/1.0.0', '');

const user = {
  "email": "ashley.williams@mmu.ac.uk",
  "password": "Wr3xh4m!"
}

function UnauthorisedScreen({ route }) {

  return <>
    <View>
      <Button title='Login' onPress={() => {

        UserApi.login(user.email, user.password)
          .then(
            (element) => {
              console.log('Successfully Logged in')
              route.params.setIsLoggedIn(true)
              AsyncStorageHelper.storeData(AsyncStorageKey.Authenticated_User, element.data.token)
            },
            () => console.log("Failed to login")
          );
      }} />
    </View>
  </>

}

export default UnauthorisedScreen;