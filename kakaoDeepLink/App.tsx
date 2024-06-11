/**
 * @format
 */

import React from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import Navigator from './src/Navigator';

const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ['kakao73540c8b1a0e2ca653ee3fc8931962aa://'],
  config: {
    screens: {
      Screen2: 'kakaolink',
    },
  },
};

// ref : https://millo-l.github.io/ReactNative-kakao-deep-link/
// ref : https://github.com/millo-L/react-native-kakao-share-link

const App = () => {
  return (
    <NavigationContainer linking={linking}>
      <Navigator />
    </NavigationContainer>
  );
};

export default App;
