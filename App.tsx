import * as React from 'react';
import StackNavigator from './src/navigation/MainStackNav';

// import { AuthContext } from './src/context/classes/auth.context';
// import { UserContext } from './src/context/classes/user.context';
import { GlobalProvider } from './src/context/GlobalContext';
import { ApiProvider } from './src/context/ApiContext';
import { AuthProvider } from './src/context/AuthContext';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // const [user, setUser] = React.useState({
  //   user_id: -1,
  //   first_name: '',
  //   last_name: '',
  //   email: '',
  // });

  // const value = React.useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn]);
  // const userValue = React.useMemo(() => ({ user, setUser }), [user]);

  return (
    <GlobalProvider>
      <AuthProvider>
        <ApiProvider>
          {/* <AuthContext.Provider value={value}>
            <UserContext.Provider value={userValue}> */}
              <StackNavigator />
            {/* </UserContext.Provider>
          </AuthContext.Provider> */}
        </ApiProvider>
      </AuthProvider>
    </GlobalProvider>
  );
}
export default App;
