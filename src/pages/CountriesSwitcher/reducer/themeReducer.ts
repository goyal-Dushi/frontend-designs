import React from 'react';

export type Any = any;

interface ThemeInitialValI {
  theme: string;
  dispatchTheme: Any;
}

export const countriesSwiththemeInitialVal: ThemeInitialValI = {
  theme: 'light',
  dispatchTheme: null,
};

const themeReducer: React.Reducer<string, string> = (theme, action) => {
  switch (action) {
    case 'light':
      return 'light';
    case 'dark':
      return 'dark';
    default:
      return theme;
  }
};

export default themeReducer;
