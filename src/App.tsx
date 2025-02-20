import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { data } from './cardsData';
import AdviceGenerator from './pages/AdviceGenerator';
import JobListing from './pages/JobListing';
import RPSpage from './pages/RPSgame';
import StatsPreviewCard from './pages/StatsPreviewCard';
import TipGenerator from './pages/TipGenerator';
import TodoApp from './pages/TodoApp';
import Meta, { MetaProps } from './common/components/Meta';
import Card from './common/components/Card';

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

export const Main: React.FC<MainProps> = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/statsCardPreview" element={<StatsPreviewCard />} />
      <Route path="/adviceGenerator" element={<AdviceGenerator />} />
      <Route path="/jobListing" element={<JobListing />} />
      <Route path="/rpsGamePage" element={<RPSpage />} />
      <Route path="/tipGenerator" element={<TipGenerator />} />
      <Route path="/todo" element={<TodoApp />} />
    </Routes>
  </HashRouter>
);
