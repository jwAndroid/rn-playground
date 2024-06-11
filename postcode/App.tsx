/**
 * @format
 */

import React, {memo} from 'react';
import {View} from 'react-native';
import Postcode from '@actbase/react-daum-postcode';

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Postcode
        style={{width: 320, height: 320}}
        jsOptions={{animation: true}}
        onSelected={data => console.log(JSON.stringify(data, null, 5))}
        onError={error => console.log(error)}
      />
    </View>
  );
};

export default memo(App);
