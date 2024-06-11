import React, {useMemo, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Text,
  LayoutChangeEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  Extrapolate,
  withTiming,
} from 'react-native-reanimated';

function StarRating() {
  const [rootViewPosX, setRootViewPosX] = useState(0);
  const [starRating, setStarRating] = useState(0);
  const [starRatingImageWidth, setStarRatingImageWidth] = useState(0);
  const step = useMemo(
    () => starRatingImageWidth * 0.1,
    [starRatingImageWidth],
  );
  const panX = useSharedValue(0);

  const starRatingWidth = useDerivedValue(() => {
    return interpolate(
      panX.value,
      [0, starRatingImageWidth],
      [0, starRatingImageWidth],
      Extrapolate.CLAMP,
    );
  }, [starRatingImageWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: starRatingWidth.value,
    };
  }, []);

  const panResponders = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: (event, gestureState) => {
          panX.value = gestureState.x0 + gestureState.dx - rootViewPosX;
        },
        onPanResponderMove: (event, gestureState) => {
          panX.value = gestureState.x0 + gestureState.dx - rootViewPosX;
        },
        onPanResponderRelease: () => {
          const ciledValue = Math.ceil(starRatingWidth.value / step);

          panX.value = withTiming(ciledValue * step, {duration: 100});
          setStarRating(ciledValue / 2);
        },
        onPanResponderTerminate: () => {
          const ciledValue = Math.ceil(starRatingWidth.value / step);

          panX.value = withTiming(ciledValue * step, {duration: 100});
          setStarRating(ciledValue / 2);
        },
        onShouldBlockNativeResponder: () => {
          return false;
        },
      }),
    [panX, rootViewPosX, starRatingWidth.value, step],
  );

  const rootContainerOnLayout = useCallback((e: LayoutChangeEvent) => {
    const {x} = e.nativeEvent.layout;

    setRootViewPosX(x);
  }, []);

  const starRatingImageOnLayout = useCallback((e: LayoutChangeEvent) => {
    const {width} = e.nativeEvent.layout;

    setStarRatingImageWidth(width);
  }, []);

  return (
    <View style={styles.rootContainer} onLayout={rootContainerOnLayout}>
      <Text style={styles.starRatingText}>{`현재 별점 ${starRating}`}</Text>
      <View style={styles.starRatingContainer}>
        <Animated.View
          style={[styles.starBackground, animatedStyle]}
          pointerEvents="none"
        />
        <View
          onLayout={starRatingImageOnLayout}
          {...panResponders.panHandlers}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: 'center',
  },
  starRatingText: {
    fontFamily: 'AppleSDGothicNeo-Regular',
    fontSize: 12,
  },
  starRatingContainer: {
    flexDirection: 'row',
  },
  starBackground: {
    position: 'absolute',
    backgroundColor: '#ffd800',
    height: '100%',
    minWidth: 0,
    maxWidth: 202,
  },
});

export default StarRating;
