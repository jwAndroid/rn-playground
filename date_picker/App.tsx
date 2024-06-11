/**
 * @format
 */

import React, {memo, useState} from 'react';
import {Pressable, SafeAreaView, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const App = () => {
  const [date, onChangeDate] = useState(new Date());
  const [visible, setVisible] = useState(false);

  const onPressDate = () => {
    setVisible(true);
  };

  const onConfirm = (selectedDate: Date) => {
    setVisible(false);

    onChangeDate(selectedDate);

    console.log(selectedDate);
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <SafeAreaView>
      <Pressable onPress={onPressDate}>
        <Text>onPressDate</Text>
      </Pressable>

      <DateTimePickerModal
        isVisible={visible}
        mode="date"
        onConfirm={onConfirm}
        onCancel={onCancel}
        date={date}
      />
    </SafeAreaView>
  );
};

export default memo(App);
