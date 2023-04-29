import React from "react";
import { Button, View } from 'react-native';
import UserService from "../../services/user.services";
import AuthService from "../../services/auth.services";
import { StorageKeys } from "../../util/as.keys";

const user = {
  "email": "ashley.williams@mmu.ac.uk",
  "password": "Wr3xh4m!"
}

function UnauthorisedScreen({ route }) {

  function handleLogin(email: string, password: string) {
    UserService.login(user.email, user.password)
      .then(async (element) => {
        if (element.status) {
          route.params.setIsLoggedIn(true); //FIXME: This is wrong..
          await AuthService.setToken(element.result.token);
        } else {
          alert(element.message);
        }
      },
      );
  }

  return <>
    <View>
      <Button title='Login' onPress={async () => {
        handleLogin(user.email, user.password);
      }} />
      <Button title='X' onPress={async () => {
        const result = await AuthService.getToken();
        console.log("GET TOKEN WEWEWE", result)
      }} />
    </View>
  </>

}

export default UnauthorisedScreen;