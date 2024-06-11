import React, {FC, memo} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';

import Profile from './screens/Profile';

const Main: FC = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <Profile />
    </NavigationContainer>
  </SafeAreaProvider>
);

export default memo(Main);
