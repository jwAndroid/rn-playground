/**
 */

import React, {memo, useCallback, useState} from 'react';
import {Image, Platform, SafeAreaView, Text, View} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

import {converter} from './src/convert';
import usePermission from './src/usePermission';
import {applyToken} from './api';
import {uploadImage} from './src/uploadImage';

const App = () => {
  const [uri, setUri] = useState('');

  usePermission();

  const onToken = useCallback(() => {
    console.log('applyToken!!');

    applyToken('');
  }, []);

  const onPhotos = useCallback(async () => {
    const result = await CameraRoll.getPhotos({first: 10, assetType: 'Photos'});

    if (result.edges.length > 0) {
      setUri(result.edges[1].node.image.uri);

      if (Platform.OS === 'ios') {
        const convertUri = await converter(result.edges[2].node.image.uri);

        uploadImage(convertUri);
      }

      if (Platform.OS === 'android') {
        const uri = result.edges[2].node.image.uri;

        uploadImage(uri);
      }
    }
  }, []);

  return (
    <SafeAreaView>
      <View style={{marginTop: 50, alignItems: 'center'}}>
        <Text onPress={onToken} style={{fontSize: 30}}>
          토큰 넣기
        </Text>

        <Text onPress={onPhotos} style={{fontSize: 30, marginTop: 50}}>
          이미지 가져오고 업로드 하기
        </Text>

        {uri !== '' ? (
          <Image
            source={{uri}}
            style={{width: 200, height: 200, marginTop: 50}}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default memo(App);
