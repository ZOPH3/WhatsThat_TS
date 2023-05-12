import React, { useContext } from 'react';
import { Button, View } from 'react-native';
import UserService from '../../services/user.services';
import AuthService from '../../services/auth.services';
import { AuthContext } from '../../context/auth.context';
import { UserContext } from '../../context/user.context';
import { LoginResponse } from '../../types/api.schema.types';

//FIXME: THIS BE HARDCODED
const user = {
  email: 'ashley.williams@mmu.ac.uk',
  password: 'Wr3xh4m!',
};

function UnauthorisedScreen() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  async function handleLogin(email: string, password: string) {
    try {
      // UserService.login(user.email, user.password).then((element) => {
      //   if (element?.user_id) {
      //     UserService.getUserInfo(element.user_id).then(async (result) => {
      //       if (result) {
      //         console.log('USER FOUND', result.user_id);
      //         setUser(result);
      //         setIsLoggedIn(true);
      //         await AuthService.setToken(element.session_token);
      //       }
      //     });
      //   }
      //   else {
      //     alert("Unable to login");
      //   }
      // },
      // (error) => alert(`${error}`) );
      const loginResult = await UserService.login(user.email, user.password);
      console.log(loginResult);

      if (!loginResult) {
        throw new Error(`Unable to login user`);
      }

      await AuthService.setToken(loginResult.token);

      let fetchedUser = await UserService.getUserInfo(loginResult.user_id);

      if (!fetchedUser) {
        throw new Error(`Unable to find user`);
      }

      console.log('USER FOUND', loginResult.user_id);
      setUser(fetchedUser);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <View>
        <Button
          title="Login"
          onPress={async () => {
            handleLogin(user.email, user.password);
          }}
        />
      </View>
    </>
  );
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
