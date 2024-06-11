import React, {memo, useState} from 'react';
import {View, Text, FlatList} from 'react-native';

interface ICarousel {
  gap: number;
  offset: number;
  pages: any[];
  pageWidth: number;
}
const Carousel = ({gap, offset, pages, pageWidth}: ICarousel) => {
  const [page, setPage] = useState(0);

  function renderItem({item}: any) {
    return (
      <Page item={item} style={{width: pageWidth, marginHorizontal: gap / 2}} />
    );
  }

  const onScroll = (e: any) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
    setPage(newPage);
  };

  return (
    <View
      style={{height: '60%', justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        data={pages}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item: any) => `page__${item.color}`}
        onScroll={onScroll}
        pagingEnabled
        renderItem={renderItem}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />

      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
        {Array.from({length: pages.length}, (_, i) => i).map(i => (
          <View
            style={{margin: 4, backgroundColor: focused ? 'red' : 'blue'}}
            key={`indicator_${i}`}
            focused={i === page}
          />
        ))}
      </View>
    </View>
  );
};

export default memo(Carousel);
