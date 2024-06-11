import React, { memo } from 'react';
import { View, Text } from 'react-native';

interface IPropsText {
  children: React.ReactNode;
}
function PropsText({ children }: IPropsText) {
  return (
    <View>
      <Text style={{ color: 'white' }}>{children}</Text>
    </View>
  );
}

export default memo(PropsText);
