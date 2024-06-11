/**
 * @format
 */

import React, {memo, useCallback} from 'react';
import {FlatList, ListRenderItem, SafeAreaView} from 'react-native';

import {images} from './source';
import StyledFastImage from './src/StyledFastImage';

const App = () => {
  const keyExtractor = useCallback(
    (_: string, index: number) => `${index + 1}`,
    [],
  );

  const renderItem = useCallback<ListRenderItem<string>>(({item}) => {
    return <StyledFastImage uri={item} />;
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default memo(App);
