import * as React from 'react';

import StackNavigator from './src/stacks';

import { GlobalProvider } from './src/lib/context/GlobalContext';
import { ApiProvider } from './src/lib/context/ApiContext';
import { AuthProvider } from './src/lib/context/AuthContext';
import { ChatProvider } from './src/lib/context/ChatContext';

function App() {
  return (
    <GlobalProvider>
      <AuthProvider>
        <ApiProvider>
          <ChatProvider>
            <StackNavigator />
          </ChatProvider>
        </ApiProvider>
      </AuthProvider>
    </GlobalProvider>
  );
}
export default App;
