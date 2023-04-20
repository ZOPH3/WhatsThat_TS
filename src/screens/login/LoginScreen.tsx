import React from "react";
import { Button, View } from 'react-native';

import ApiUserClient from "../../api/ApiUserClient";
import AsyncStorageHelper from "../../util/as.helper";
import { AsyncStorageKey } from "../../util/as.keys";
import log from "../../util/logger.util";
import { saveKey } from "../../wrappers/storage.methods";

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
              log.info('Successfully Logged in')
              route.params.setIsLoggedIn(true);
              saveKey("user", {token : element.data.token});
              AsyncStorageHelper.storeData(AsyncStorageKey.Authenticated_User, element.data.token)
            },
            () => console.log("Failed to login")
          );
      }} />
    </View>
  </>

}

export default UnauthorisedScreen;