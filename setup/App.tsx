/**
 * @format
 */

import React, { memo } from 'react';
import { ThemeProvider } from '@emotion/react';

import { HelloReactNative } from './src/components';
import { AppTheme } from './src/theme';

function App() {
  return (
    <ThemeProvider theme={AppTheme}>
      <HelloReactNative />
    </ThemeProvider>
  );
}

export default memo(App);
