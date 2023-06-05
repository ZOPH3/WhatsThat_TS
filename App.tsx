import * as React from 'react';

import StackNavigator from './src/stacks';

import { GlobalProvider } from './src/lib/context/GlobalContext';
import { ApiProvider } from './src/lib/context/ApiContext';
import { AuthProvider } from './src/lib/context/AuthContext';

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
