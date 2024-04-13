import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useMemo, useReducer } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { data } from './cardsData';
import Card from './common/components/Card';
import Meta, { MetaProps } from './common/components/Meta';
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

const metaData: MetaProps = {
  title: 'Frontend Designs',
  desc: 'Frontend Designs using React JS',
  keywords:
    'UI designs using React, React Js Designs, Frontend Design using React',
  pgType: 'main',
};

interface AppProps {}

const App: React.FC<AppProps> = () => (
  <>
    <Meta {...metaData} />
    <main className="container">
      <h1 className="display-5 text-center py-2 header"> FRONTEND DESIGNS </h1>
      <div className="row">
        {data.map((val) => {
          const { cardUrl, imgUrl, title, id } = val;
          return (
            <div key={id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 my-2">
              <Card cardUrl={cardUrl} imgUrl={imgUrl} title={title} />
            </div>
          );
        })}
      </div>
      <footer className="attribution bottom-0 py-2 w-100">
        Coded by <a href="https://dushyantgoyal.vercel.app/">Dushyant Goyal</a>.
      </footer>
    </main>
  </>
);

interface MainProps {}

export const Main: React.FC<MainProps> = () => {
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
