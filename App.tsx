import * as React from 'react';
import StackNavigator from './src/navigation/StackNavigator';
// import { Provider as StoreProvider } from 'react-redux'
// import store from './src/redux/store'

import { AuthContext } from './src/context/auth.context';
function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const value = React.useMemo(
    () => ({ isLoggedIn, setIsLoggedIn }),
    [isLoggedIn]
  );

  return (
    <AuthContext.Provider value={value}>
      <StackNavigator />
    </AuthContext.Provider>

  );
}

// export default App;

// function App() {
//   return (
//     <StoreProvider store={store}>
//       <StackNavigator />
//     </StoreProvider>
//   );
// }

export default App;
