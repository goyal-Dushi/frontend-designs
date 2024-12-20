import React, { useMemo, useReducer } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AdviceGenerator from './pages/AdviceGenerator';
import CountryDetails from './pages/CountriesSwitcher/components/CountryDetails';
import themeReducer, {
  CountriesSwitcherThemeContext,
} from './pages/CountriesSwitcher/reducer/themeReducer';
import JobListing from './pages/JobListing';
import RPSpage from './pages/RPSgame';
import StatsPreviewCard from './pages/StatsPreviewCard';
import TipGenerator from './pages/TipGenerator';
import CountriesSwitcher from './pages/CountriesSwitcher';
import App from './App';

export interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const [theme, dispatchTheme] = useReducer(themeReducer, 'light');

  const contextValue = useMemo(
    () => ({ theme, dispatchTheme }),
    [theme, dispatchTheme]
  );

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/statsCardPreview" element={<StatsPreviewCard />} />
        <Route path="/adviceGenerator" element={<AdviceGenerator />} />
        <Route path="/jobListing" element={<JobListing />} />
        <Route path="/rpsGamePage" element={<RPSpage />} />
        <Route path="/tipGenerator" element={<TipGenerator />} />
        <Route
          path="/countries/*"
          element={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <CountriesSwitcherThemeContext.Provider value={contextValue}>
              <Routes>
                <Route path="/" element={<CountriesSwitcher />} />
                <Route path=":country" element={<CountryDetails />} />
              </Routes>
            </CountriesSwitcherThemeContext.Provider>
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default Main;
