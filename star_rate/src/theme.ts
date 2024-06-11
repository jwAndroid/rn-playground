import {Theme} from '@emotion/react';

export const icon = {
  em: require('../assets/icon/em.png'),
  har: require('../assets/icon/har.png'),
  star: require('../assets/icon/star.png'),
  TransparentStarGroupSvg: require('../assets/icon/TransparentStarGroupSvg.svg'),
};

export const AppTheme: Theme = {
  color: {
    white: '#fff',
    black: '#000',
  },
  icon,
};

export type IAppTheme = typeof AppTheme;
