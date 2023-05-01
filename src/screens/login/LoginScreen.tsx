import React, { useContext } from "react";
import { Button, View } from 'react-native';
import UserService from "../../services/user.services";
import AuthService from "../../services/auth.services";
import { AuthContext } from "../../context/auth.context";
import { UserContext } from "../../context/user.context";

//FIXME: THIS BE HARDCODED
const user = {
  "email": "ashley.williams@mmu.ac.uk",
  "password": "Wr3xh4m!"
}

function UnauthorisedScreen({ route }) {
  const { setIsLoggedIn } = useContext(AuthContext);
  const {setUser} = useContext(UserContext);

  function handleLogin(email: string, password: string) {
    UserService.login(user.email, user.password)
      .then((element) => {
        if (element.status) {
          UserService.getUserInfo(element.result.id).then(async (result) => {
            if(result.status) {
              console.log("USER FOUND", result.result)
              setUser(result.result);
              setIsLoggedIn(true);
              await AuthService.setToken(element.result.token);
            }
          })
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
    </View>
  </>

}

// function UnauthorisedScreen({ route }) {
//   // const { setIsLoggedIn } = useContext(AuthContext);
//   const dispatch = useAppDispatch()

//   function handleLogin(email: string, password: string) {
//     UserService.login(user.email, user.password)
//       .then(async (element) => {
//         if (element.status) {
//           await AuthService.setToken(element.result.token);
//           dispatch(login());
//         } else {
//           alert(element.message);
//         }
//       },
//       );
//   }

//   return <>
//     <View>
//       <Button title='Login' onPress={async () => {
//         handleLogin(user.email, user.password);
//       }} />
//     </View>
//   </>

// }

export default UnauthorisedScreen;