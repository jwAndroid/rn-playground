import React, {memo} from 'react';
import {useWindowDimensions} from 'react-native';
import FastImage from 'react-native-fast-image';

interface IStyledFastImage {
  uri: string;
}
const StyledFastImage = ({uri}: IStyledFastImage) => {
  const {width} = useWindowDimensions();

  return (
    <FastImage
      style={{width: width / 2, height: 200}}
      source={{
        uri,
        priority: FastImage.priority.high,
      }}
    />
  );
};

export default memo(StyledFastImage);
