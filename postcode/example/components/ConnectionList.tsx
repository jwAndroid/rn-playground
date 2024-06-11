import React, {ComponentClass, forwardRef, memo, useCallback} from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleSheet,
} from 'react-native';
import Animated, {AnimateProps} from 'react-native-reanimated';

import ConnectionItem from './ConnectionItem';
import {Connection} from '../types/Connection';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export const AnimatedFlatList: ComponentClass<
  AnimateProps<FlatListProps<Connection>>
> = Animated.createAnimatedComponent(FlatList);

type Props = Omit<FlatListProps<Connection>, 'renderItem'>;

const ConnectionList = forwardRef<FlatList, Props>((props, ref) => {
  const keyExtractor = useCallback(
    (_: any, index: number) => index.toString(),
    [],
  );

  const renderItem = useCallback<ListRenderItem<Connection>>(
    ({item}) => <ConnectionItem connection={item} />,
    [],
  );

  return (
    <AnimatedFlatList
      ref={ref}
      style={styles.container}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      {...props}
    />
  );
});

export default memo(ConnectionList);
