import React, {memo, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const NUM_ITEMS = 20;

function getColor(i: number, numItems: number) {
  const multiplier = 255 / (numItems - 1);

  const colorVal = i * multiplier;

  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

const mapIndexToData = (d: any, index: number, arr: any[]) => {
  const backgroundColor = getColor(index, arr.length);

  return {
    text: `${index}`,
    key: `key-${backgroundColor}`,
    backgroundColor,
  };
};

type Item = ReturnType<typeof mapIndexToData>;

const initialData: Item[] = [...Array(NUM_ITEMS)].map(mapIndexToData);

const App = () => {
  const [data, setData] = useState(initialData);

  const renderItem = ({item, drag, isActive}: RenderItemParams<Item>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.rowItem,
            {backgroundColor: isActive ? 'red' : item.backgroundColor},
          ]}>
          <Text style={styles.text}>{item.text}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <SafeAreaView>
      <GestureHandlerRootView>
        <DraggableFlatList
          data={data}
          onDragEnd={({data}) => setData(data)}
          keyExtractor={item => item.key}
          renderItem={renderItem}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default memo(App);

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
