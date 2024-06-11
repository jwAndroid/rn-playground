import {FlatList, ListRenderItem, Text, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
interface Type {
  id: string;
  text: string;
}

const data = [
  {id: '1', text: 'ㅅㅂㅅㅂ123123ㅅ'},
  {id: '2', text: 'ㅅㅂㅅ123ㅂㅅ'},
  {id: '3', text: 'ㅅㅂㅅ123123124ㅂㅅ'},
  {id: '4', text: 'ㅅㅂㅅ123ㅂㅅ'},
  {id: '5', text: 'ㅅㅂㅅ123123ㅂㅅ'},
  {id: '6', text: 'ㅅㅂㅅㅂ123123ㅅ'},
  {id: '7', text: 'ㅅㅂㅅㅂ124124ㅅ'},
  {id: '8', text: 'ㅅㅂㅅ123124124ㅂㅅ'},
  {id: '9', text: 'ㅅㅂㅅㅂ12412412ㅅ'},
  {id: '10', text: 'ㅅㅂㅅ312312ㅂㅅ'},
  {id: '11', text: 'ㅅㅂㅅ4124ㅂㅅ'},
  {id: '12', text: 'ㅅㅂㅅ123124123ㅂㅅ'},
  {id: '21', text: 'ㅅㅂㅅㅂ123123ㅅ'},
  {id: '24512', text: 'ㅅㅂㅅ123ㅂㅅ'},
  {id: '3123', text: 'ㅅㅂㅅ123123124ㅂㅅ'},
  {id: '41241223', text: 'ㅅㅂㅅ123ㅂㅅ'},
  {id: '5124', text: 'ㅅㅂㅅ123123ㅂㅅ'},
  {id: '1246', text: 'ㅅㅂㅅㅂ123123ㅅ'},
  {id: '232147', text: 'ㅅㅂㅅㅂ124124ㅅ'},
  {id: '1245128', text: 'ㅅㅂㅅ123124124ㅂㅅ'},
  {id: '1249', text: 'ㅅㅂㅅㅂ12412412ㅅ'},
  {id: '12340', text: 'ㅅㅂㅅ312312ㅂㅅ'},
  {id: '132541', text: 'ㅅㅂㅅ4124ㅂㅅ'},
  {id: '12312', text: 'ㅅㅂㅅ123124123ㅂㅅ'},
];

const HomeScreen = () => {
  useEffect(() => {
    console.log('home render');
  }, []);

  const renderItem = useCallback<ListRenderItem<Type>>(
    ({item}) => <Text style={{fontSize: 40}}>{item.text}</Text>,
    [],
  );

  const keyExtractor = useCallback((item: Type) => `${item.id}`, []);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HomeScreen;
