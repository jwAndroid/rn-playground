/**
 * @format
 */

import React, {memo} from 'react';
import {View} from 'react-native';
import IMP from 'iamport-react-native';

const Certification = () => {
  function callback(response: any) {
    console.log('### response ###');

    console.log(JSON.stringify(response, null, 5));
  }

  const data = {
    merchant_uid: 'mid_${DateTime.now().millisecondsSinceEpoch}',
    company: '', // 회사명 또는 URL
    carrier: '', // 통신사
    name: '', // 이름
    phone: '',
    min_age: '',
  };

  return (
    <View style={{flex: 1}}>
      <IMP.Certification
        userCode="imp10391932" // 가맹점 테스트 식별코드
        data={data}
        callback={callback}
      />
    </View>
  );
};

export default memo(Certification);
