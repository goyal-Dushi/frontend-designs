import React, { useContext } from 'react';
import DarkMode from '../../../common/icons/DarkMode';
import LightMode from '../../../common/icons/LightMode';
import { CountriesSwitcherThemeContext } from '../reducer/themeReducer';

export interface ThemeHandlerProps {}

const ThemeHandler: React.FC<ThemeHandlerProps> = () => {
  const { theme, dispatchTheme } = useContext(CountriesSwitcherThemeContext);

  const handleModeSwitch = () => {
    if (theme === 'light') {
      dispatchTheme('dark');
      return;
    }

    dispatchTheme('light');
  };

  return (
    <div>
      <button type="button" onClick={handleModeSwitch} className="border-0 btn">
        {theme === 'light' ? (
          <>
            <DarkMode /> <span> Dark Mode </span>
          </>
        ) : (
          <>
            <LightMode /> <span> Light Mode </span>
          </>
        )}
      </button>
    </div>
  );
};

export default ThemeHandler;
