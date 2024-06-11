/**
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import {ThemeProvider} from '@emotion/react';

import {AppTheme} from './src/theme';
import RatingScreen from './src/RatingScreen';

const App = () => {
  return (
    <ThemeProvider theme={AppTheme}>
      <SafeAreaView>
        <RatingScreen />
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default App;
