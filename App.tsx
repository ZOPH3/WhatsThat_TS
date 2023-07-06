import * as React from 'react';

import StackNavigator from './src/stacks';

import { GlobalProvider } from './src/lib/context/global';
import { NotificationProvider } from './src/lib/context/notification';
import { ContactsProvider } from './src/lib/context/contact/ContactContext';
import { ServiceProvider } from './src/lib/context/services';
import { AuthProvider } from './src/lib/context/auth';
import { ApiProvider } from './src/lib/context/api';
import { ChatProvider } from './src/lib/context/chats';

function App() {
  return (
    <GlobalProvider>
      <NotificationProvider>
        <AuthProvider>
          <ApiProvider>
            <ContactsProvider>
              <ChatProvider>
                <ServiceProvider>
                  <StackNavigator />
                </ServiceProvider>
              </ChatProvider>
            </ContactsProvider>
          </ApiProvider>
        </AuthProvider>
      </NotificationProvider>
    </GlobalProvider>
  );
}
export default App;
