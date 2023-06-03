import React, { useContext } from 'react';
import { Button, View } from 'react-native';
import log from '../../util/LoggerUtil';
import { useApiContext } from '../../context/ApiContext';
import { useAuthContext } from '../../context/AuthContext';
import UserController from '../../controllers/UserController';
import { UserContext } from '../../context/classes/user.context';

//FIXME: THIS BE HARDCODED
// const user = {
//   email: 'ashley.williams@mmu.ac.uk',
//   password: 'Wr3xh4m!',
// };

const user = {
  email: 'newwilliams@mmu.ac.uk',
  password: 'Characters1*',
};

function UnauthorisedScreen() {
  // const { setAuthState } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);
  const { publicApi, authApi } = useApiContext();
  const authContext = useAuthContext();

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const onLogin = async (email: string, password: string) => {
    try {
      if (!publicApi || !authContext.setAuthState) {
        throw new Error('Unable to find Public API');
      }

      const post = await publicApi.post('/login', {
        email,
        password,
      });

      const { id, token } = post.data;
      
      // await ASHelper.setKey(StorageKeys.AuthToken, token);
      // const t = await ASHelper.getItem(StorageKeys.AuthToken);

      log.debug("TOKEN FOUND: " + token);

      if(token){
        authContext.setAuthState({
          accessToken: token,
          authenticated: true,
        });
      }

      const user = await UserController.getUserInfo(id, authApi!);

      if (!user) {
        throw new Error(`Unable to find user`);
      }
     
      setUser(user);

    } catch (error) {
      log.error('Unable to login...');
      alert(error);
    }
  };

  return (
    <>
      <View>
        <Button
          title="Login"
          onPress={async () => {
            onLogin(user.email, user.password);
          }}
        />
      </View>
    </>
  );
}

export default UnauthorisedScreen;
