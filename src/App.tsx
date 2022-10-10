import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { data } from './cardsData';
import Card from './components/common/Card';
import StatsPreviewCard from './pages/StatsPreviewCard';
import AdviceGenerator from './pages/AdviceGenerator';
import JobListing from './pages/JobListing';
import { HashRouter,Routes,Route } from 'react-router-dom'
import Meta, { MetaProps } from './components/common/Meta';

export const Main = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<App/>} />
          <Route path='/statsCardPreview' element={<StatsPreviewCard/>} />
          <Route path='/adviceGenerator' element={<AdviceGenerator />} />
          <Route path='/jobListing' element={<JobListing />} />
        </Routes>
      </HashRouter>
    </>
  )
}

const metaData: MetaProps = {
  title:'Frontend Designs',
  desc:'Frontend Designs using React JS',
  keywords:'UI designs using React, React Js Designs, Frontend Design using React',
  pgType: 'main'
}

function App() {
  return (
    <>
    <Meta {...metaData} />
    <main className="container">
      <h1 className="display-5 text-center py-2 header"> FRONTEND DESIGNS </h1>
      <div className="row">
          {data.map((val) => {
            const { cardUrl, imgUrl, title, id } = val;
            return(
              <div key={id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 my-2">
              <Card cardUrl={cardUrl} imgUrl={imgUrl} title={title} />
              </div>
            )
          })}
      </div>
        <footer className="attribution bottom-0 py-2 w-100">
          Challenge by{' '}
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer"
          >Frontend Mentor</a>. Coded by {' '}
          <a href="https://dushyantgoyal.herokuapp.com">Dushyant Goyal</a>.
        </footer>
    </main>
    </>
  );
}
