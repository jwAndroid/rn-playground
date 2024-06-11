import React, {useMemo} from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import NotificationScreen from './screens/NotificationScreen';
import MessageScreen from './screens/MessageScreen';
import {SafeAreaView, Text} from 'react-native';

const {Navigator, Screen} = createMaterialTopTabNavigator();

const MainScreen = () => {
  const screenOptions = useMemo<MaterialTopTabNavigationOptions>(
    () => ({
      swipeEnabled: false,
    }),
    [],
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={{fontSize: 30, margin: 20}}>Profile Component..</Text>

      <Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarInactiveTintColor: 'blue',
            tabBarLabel: 'Home',
          }}
        />
        <Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarInactiveTintColor: 'blue',
            tabBarLabel: 'Search',
          }}
        />
        <Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarInactiveTintColor: 'blue',
            tabBarLabel: 'Noti',
          }}
        />
        <Screen
          name="Message"
          component={MessageScreen}
          options={{
            tabBarInactiveTintColor: 'blue',
            tabBarLabel: 'Message',
          }}
        />
      </Navigator>
    </SafeAreaView>
  );
};

export default MainScreen;
