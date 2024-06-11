/**
 * @format
 */

import React, {memo, useCallback, useState} from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import PaymentModal from './src/PaymentModal';

const App = () => {
  const [isShow, setShow] = useState(false);

  const callback = useCallback((response: any) => {
    console.log(JSON.stringify(response, null, 5));

    setShow(false);
  }, []);

  const onPress = useCallback(() => {
    setShow(true);
  }, []);

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text onPress={onPress} style={{fontSize: 30}}>
        SHOW PAYMENT
      </Text>

      <PaymentModal visible={isShow} callback={callback} />
    </SafeAreaView>
  );
};

export default memo(App);
