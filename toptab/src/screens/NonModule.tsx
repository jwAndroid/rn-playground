import React, {useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

interface IRoute {
  route: string;
  isFocus: boolean;
}

const NonModule = () => {
  const [routes, setRoutes] = useState<IRoute[]>([
    {route: 'a', isFocus: true},
    {route: 'b', isFocus: false},
    {route: 'c', isFocus: false},
  ]);

  const clickRoute = (routeName: string) => () => {
    const prepared = routes.map(route =>
      route.route === routeName
        ? {...route, isFocus: !route.isFocus}
        : {...route, isFocus: false},
    );

    setRoutes(prepared);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Component</Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {routes.map((route, index) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5,
              borderBottomWidth: 1,
              borderBottomColor: route.isFocus ? 'black' : 'white',
            }}>
            <Text
              key={`${index + 1}`}
              onPress={clickRoute(route.route)}
              style={{fontSize: 25}}>
              {route.route} click
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default NonModule;
