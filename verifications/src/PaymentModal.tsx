import {Modal} from 'react-native';
import React from 'react';
import Payment from './Payment';

interface IPaymentModal {
  visible: boolean;
  callback: any;
}
const PaymentModal = ({visible, callback}: IPaymentModal) => {
  return (
    <Modal visible={visible}>
      <Payment callback={callback} />
    </Modal>
  );
};

export default PaymentModal;
