import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationParamList} from './Navigator';

type NavigationProp = StackNavigationProp<NavigationParamList, 'Screen1'>;

const Screen1 = () => {
  const navigation = useNavigation<NavigationProp>();
  const onPress = useCallback(
    () => navigation.navigate('Screen2', {test: 'from Screen1'}),
    [navigation],
  );

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>스크린2로 이동</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Screen1;
