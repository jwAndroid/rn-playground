/**
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {memo} from 'react';

import MainScreen from './src/MainScreen';

const App = () => {
  return (
    <NavigationContainer>
      <MainScreen />
    </NavigationContainer>
  );
};

export default memo(App);
