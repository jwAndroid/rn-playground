import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';

const RatingScreen = () => {
  const onFinishRating = useCallback((rate: number) => {
    console.log('onFinishRating', rate);
  }, []);

  const onFinishRating2 = useCallback((num: number) => {
    console.log('onFinishRating2', num);
  }, []);

  return (
    <SafeAreaView>
      <AirbnbRating
        count={5}
        defaultRating={5}
        showRating={false}
        isDisabled
        size={20}
        onFinishRating={onFinishRating}
      />

      <Rating
        readonly
        showRating={false}
        onFinishRating={onFinishRating2}
        ratingCount={5}
        startingValue={4}
      />

      <Rating
        type="heart"
        ratingCount={3}
        imageSize={60}
        showRating
        onFinishRating={() => {}}
      />

      <Rating
        type="custom"
        ratingColor="#3498db"
        ratingBackgroundColor="#c8c7c8"
        ratingCount={10}
        imageSize={30}
        onFinishRating={() => {}}
        style={{paddingVertical: 10}}
      />
    </SafeAreaView>
  );
};

export default RatingScreen;
