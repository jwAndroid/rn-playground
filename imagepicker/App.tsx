/**
 * @format
 */

import React, {memo, useCallback} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const App = () => {
  const launch = useCallback(async () => {
    const {assets} = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 5,
    });

    console.log(JSON.stringify(assets, null, 5));
  }, []);

  return (
    <SafeAreaView>
      <Text onPress={launch} style={{fontSize: 20}}>
        go
      </Text>
    </SafeAreaView>
  );
};

export default memo(App);
