import React from "react";
import { Button, View } from 'react-native';

import { TokenStoreWrapper } from "../../store/token.store";
import UserService from "../../services/user.services";

const user = {
  "email": "ashley.williams@mmu.ac.uk",
  "password": "Wr3xh4m!"
}

// function async handleLogin(email: string, password: string){
//   const result = await UserService.login(email, password);
//   dispatch({

//   })
// }

function UnauthorisedScreen({ route }) {

  return <>
    <View>
      <Button title='Login' onPress={() => {
        UserService.login(user.email, user.password)
          .then(
            async (element) => {
              if(element.status) {
                route.params.setIsLoggedIn(true); //FIXME: This is wrong...
                await TokenStoreWrapper.getInstance().setToken(element.result.token);
              }else {
                alert(element.message);
              }
            },
          );
      }} />
    </View>
  </>

}

export default UnauthorisedScreen;