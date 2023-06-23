import * as React from 'react';

import StackNavigator from './src/stacks';

import { GlobalProvider } from './src/lib/context/GlobalContext';
import { ApiProvider } from './src/lib/context/ApiContext';
import { AuthProvider } from './src/lib/context/AuthContext';
import { ChatListProvider } from './src/lib/context/ChatListContext';
import { ChatProvider } from './src/lib/context/ChatContext';

function App() {
  return (
    <GlobalProvider>
      <AuthProvider>
        <ApiProvider>
          <ChatListProvider>
            <ChatProvider>
              <StackNavigator />
            </ChatProvider>
          </ChatListProvider>
        </ApiProvider>
      </AuthProvider>
    </GlobalProvider>
  );
}
export default App;
