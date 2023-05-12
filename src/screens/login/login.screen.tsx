import React, { useContext } from 'react';
import { Button, View } from 'react-native';
import { AuthContext } from '../../context/auth.context';
import { UserContext } from '../../context/user.context';
import { loginHandler } from '../../handlers/auth.handler';

//FIXME: THIS BE HARDCODED
const user = {
  email: 'ashley.williams@mmu.ac.uk',
  password: 'Wr3xh4m!',
};

function UnauthorisedScreen() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  async function handleLogin(email: string, password: string) {
    const user = await loginHandler(email, password);

    if(!user) {
      alert("Unable to login");
      return;
    }

    setUser(user);
    setIsLoggedIn(true);
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
