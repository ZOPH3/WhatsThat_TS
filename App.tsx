import * as React from 'react';

import StackNavigator from './src/stacks';

import { GlobalProvider } from './src/context/GlobalContext';
import { ApiProvider } from './src/context/ApiContext';
import { AuthProvider } from './src/context/AuthContext';

function App() {
  return (
    <GlobalProvider>
      <AuthProvider>
        <ApiProvider>
          <StackNavigator />
        </ApiProvider>
      </AuthProvider>
    </GlobalProvider>
  );
}
export default App;
