import * as React from 'react';
import StackNavigator from './src/navigation/StackNavigator';
// import { Provider as StoreProvider } from 'react-redux'
// import store from './src/redux/store'

function App() {
  return (
    // <StoreProvider store={store}>
      <StackNavigator />
    // </StoreProvider>

  );
}

export default App;
