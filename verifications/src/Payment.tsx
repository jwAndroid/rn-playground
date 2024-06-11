import React from 'react';
import IMP from 'iamport-react-native';

import {key} from '../key';

interface IPayment {
  callback: any;
}
const Payment = ({callback}: IPayment) => {
  const data = {
    pg: 'danal_tpay',
    pay_method: 'card',
    name: 'shakalaka-dev',
    merchant_uid: `mid_${new Date().getTime()}`,
    amount: '39000',
    buyer_name: '홍길동',
    buyer_tel: '01012345678',
    buyer_email: 'example@naver.com',
    buyer_addr: '서울시 강남구 신사동 661-16',
    buyer_postcode: '06018',
    app_scheme: 'example',
    escrow: false,
  };

  return <IMP.Payment userCode={key} data={data} callback={callback} />;
};

export default Payment;
