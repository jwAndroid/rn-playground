/**
 * @format
 */

import React, {memo} from 'react';
import {Dimensions, SafeAreaView} from 'react-native';

import Carousel from './src/Carousel';

const screenWidth = Math.round(Dimensions.get('window').width);
const PAGES = [
  {
    num: 1,
    color: '#86E3CE',
  },
  {
    num: 2,
    color: '#D0E6A5',
  },
  {
    num: 3,
    color: '#FFDD94',
  },
  {
    num: 4,
    color: '#FA897B',
  },
  {
    num: 5,
    color: '#CCABD8',
  },
];

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Carousel
        gap={16}
        offset={36}
        pages={PAGES}
        pageWidth={screenWidth - (16 + 36) * 2}
      />
    </SafeAreaView>
  );
};

export default memo(App);
