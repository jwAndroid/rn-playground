import React, {useState, useCallback, useRef, useEffect, memo} from 'react';
import {View, StyleSheet, Animated, TouchableOpacity, Text} from 'react-native';
import {TabView} from 'react-native-tab-view';

import CollapsibleFlatList from './CollapsibleFlatList';
import CollapsibleHeader from './CollapsibleHeader';

const TABBAR_HEIGHT = 60;

type IRoute = {
  key: string;
  title: string;
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    width: '100%',
  },
  collapsibleTabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: TABBAR_HEIGHT,
    backgroundColor: '#FFFFFF',
    zIndex: 1,
  },
  collapsibleTabBarButton: {
    flex: 1,
  },
  collapsibleTabBarLabelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  collapsibleTabBarLabelText: {
    fontSize: 15,
    color: '#587058',
  },
});

function CollapsibleTabViewTestScreen() {
  const [headerHeight, setHeaderHeight] = useState(0);

  const [tabRoutes] = useState<IRoute[]>([
    {key: 'screen1', title: 'screen1'},
    {key: 'screen2', title: 'screen2'},
  ]);

  const [tabIndex, setTabIndex] = useState(0);

  const tabIndexRef = useRef(0);
  const isListGlidingRef = useRef(false);
  const listArrRef = useRef([]);
  const listOffsetRef = useRef();
  const scrollY = useRef<Animated.Value>(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  });

  const tabBarTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [headerHeight, 0],
    extrapolateRight: 'clamp',
  });

  useEffect(() => {
    const subscribe = scrollY.addListener(() => {});

    return () => {
      scrollY.removeListener(subscribe);
    };
  }, [scrollY]);

  const headerOnLayout = useCallback((event: any) => {
    const {height} = event.nativeEvent.layout;

    setHeaderHeight(height);
  }, []);

  const onTabIndexChange = useCallback((id: number) => {
    setTabIndex(id);

    tabIndexRef.current = id;
  }, []);

  const onTabPress = useCallback((idx: number) => {
    if (!isListGlidingRef.current) {
      setTabIndex(idx);

      tabIndexRef.current = idx;
    }
  }, []);

  const syncScrollOffset = useCallback(() => {
    const focusedTabKey = tabRoutes[tabIndexRef.current].key;

    listArrRef.current.forEach(item => {
      if (item.key !== focusedTabKey) {
        if (scrollY._value < headerHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });

            listOffsetRef.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= headerHeight) {
          if (
            listOffsetRef.current[item.key] < headerHeight ||
            listOffsetRef.current[item.key] === null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: headerHeight,
                animated: false,
              });
              listOffsetRef.current[item.key] = headerHeight;
            }
          }
        }
      } else {
        if (item.value) {
          listOffsetRef.current[item.key] = scrollY._value;
        }
      }
    });
  }, [headerHeight, scrollY._value, tabRoutes]);

  const onMomentumScrollBegin = useCallback(() => {
    isListGlidingRef.current = true;
  }, []);

  const onMomentumScrollEnd = useCallback(() => {
    isListGlidingRef.current = false;

    syncScrollOffset();
  }, [syncScrollOffset]);

  const onScrollEndDrag = useCallback(() => {
    syncScrollOffset();
  }, [syncScrollOffset]);

  const renderTabBar = useCallback(
    (props: any) => {
      return (
        <Animated.View
          style={[
            styles.collapsibleTabBar,
            {transform: [{translateY: tabBarTranslateY}]},
          ]}>
          {props.navigationState.routes.map((route: any, idx: number) => {
            return (
              <TouchableOpacity
                style={styles.collapsibleTabBarButton}
                key={idx}
                onPress={() => {
                  onTabPress(idx);
                }}>
                <View style={styles.collapsibleTabBarLabelContainer}>
                  <Text style={styles.collapsibleTabBarLabelText}>
                    {route.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      );
    },
    [onTabPress, tabBarTranslateY],
  );

  const renderScene = useCallback(
    ({route}: any) => {
      const isFocused = route.key === tabRoutes[tabIndex].key;

      return (
        <CollapsibleFlatList
          headerHeight={headerHeight}
          tabBarHeight={TABBAR_HEIGHT}
          scrollY={scrollY}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          tabRoute={route}
          listArrRef={listArrRef}
          isTabFocused={isFocused}
        />
      );
    },
    [
      headerHeight,
      onMomentumScrollBegin,
      onMomentumScrollEnd,
      onScrollEndDrag,
      scrollY,
      tabIndex,
      tabRoutes,
    ],
  );

  return (
    <View style={styles.rootContainer}>
      {headerHeight > 0 ? (
        <TabView
          navigationState={{index: tabIndex, routes: tabRoutes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={onTabIndexChange}
          swipeEnabled={false}
        />
      ) : null}

      <Animated.View
        style={{
          ...styles.headerContainer,
          transform: [{translateY: headerTranslateY}],
        }}
        onLayout={headerOnLayout}
        pointerEvents="box-none">
        <CollapsibleHeader />
      </Animated.View>
    </View>
  );
}

export default memo(CollapsibleTabViewTestScreen);
