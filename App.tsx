import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { Paragraph, Spacer, TamaguiProvider, Theme, YStack } from 'tamagui';
import config from './tamagui.config';

import * as React from 'react';
import StackNavigator from './src/navigation/main.stack.navigator';

import { AuthContext } from './src/context/auth.context';
import { UserContext } from './src/context/user.context';

function App() {
  // const colorScheme = useColorScheme();

  // const [loaded] = useFonts({
  //   Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
  //   InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  // });

  // if (!loaded) {
  //   return null;
  // }

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
      <AuthContext.Provider value={value}>
        <UserContext.Provider value={userValue}>
          <StackNavigator />
        </UserContext.Provider>
      </AuthContext.Provider>
  );
  // return (
  //   <TamaguiProvider config={config}>
  //     <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
  //       <YStack f={1} jc="center" ai="center" backgroundColor={'$backgroundSoft'}>
  //         <Paragraph color="$color" jc="center">
  //           {colorScheme}
  //         </Paragraph>
  //         <StatusBar style="auto" />
  //       </YStack>
  //     </Theme>
  //   </TamaguiProvider>
  // );
}
export default App;
