import React, {useCallback, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import KakaoShareLink from 'react-native-kakao-share-link';
import {useNavigation} from '@react-navigation/native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationParamList} from './Navigator';

type NavigationProp = StackNavigationProp<NavigationParamList, 'Screen2'>;
type Screen2Route = RouteProp<NavigationParamList, 'Screen2'>;

const Screen2 = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<Screen2Route>();
  const {test} = route.params;
  const onPressBack = useCallback(() => navigation.goBack(), [navigation]);
  const onPressShare = useCallback(async () => {
    try {
      const response = await KakaoShareLink.sendText({
        text: 'text',
        link: {
          webUrl: 'https://developers.kakao.com/',
          mobileWebUrl: 'https://developers.kakao.com/',
        },
        buttons: [
          {
            title: '앱에서 보기',
            link: {
              androidExecutionParams: [{key: 'test', value: 'from Kakao App'}],
              iosExecutionParams: [{key: 'test', value: 'from Kakao App'}],
            },
          },
        ],
      });
      console.log(response);
    } catch (e: any) {
      console.error(e);
      console.error(e.message);
    }
  }, []);

  useEffect(() => {
    Alert.alert(test);
  }, [test]);

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={onPressBack}>
        <Text style={styles.text}>뒤로가기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onPressShare}>
        <Text style={styles.text}>카카오톡으로 공유하기</Text>
      </TouchableOpacity>
    </>
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

export default Screen2;
