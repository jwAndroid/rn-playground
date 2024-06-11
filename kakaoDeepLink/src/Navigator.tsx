import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Screen1 from './Screen1';
import Screen2 from './Screen2';

export type NavigationParamList = {
  Screen1: undefined;
  Screen2: {
    test: string;
  };
};

const Stack = createStackNavigator<NavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Screen1" component={Screen1} />
      <Stack.Screen name="Screen2" component={Screen2} />
    </Stack.Navigator>
  );
};

export default Navigator;
