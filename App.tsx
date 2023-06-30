import * as React from 'react';

import StackNavigator from './src/stacks';

import { GlobalProvider } from './src/lib/context/GlobalContext';
import { ApiProvider } from './src/lib/context/ApiContext';
import { AuthProvider } from './src/lib/context/AuthContext';
import { ChatProvider } from './src/lib/context/ChatContext';
import { NotificationProvider } from './src/lib/context/NotificationContext';
import { ContactsProvider } from './src/lib/context/ContactContext';

function App() {
  return (
    <GlobalProvider>
      <NotificationProvider>
        <AuthProvider>
          <ApiProvider>
            <ContactsProvider>
              <ChatProvider>
                <StackNavigator />
              </ChatProvider>
            </ContactsProvider>
          </ApiProvider>
        </AuthProvider>
      </NotificationProvider>
    </GlobalProvider>
  );
}
export default App;
