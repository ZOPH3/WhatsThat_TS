import * as React from 'react';
import StackNavigator from './src/navigation/main.stack.navigator';

import { AuthContext } from './src/context/classes/auth.context';
import { UserContext } from './src/context/classes/user.context';
import { GlobalProvider } from './src/context/GlobalContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({
    user_id: -1,
    first_name: '',
    last_name: '',
    email: '',
  });

  const value = React.useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn]);

  const userValue = React.useMemo(() => ({ user, setUser }), [user]);

  return (
    <GlobalProvider>
      <AuthContext.Provider value={value}>
        <UserContext.Provider value={userValue}>
          <StackNavigator />
        </UserContext.Provider>
      </AuthContext.Provider>
    </GlobalProvider>
  );
}
export default App;
