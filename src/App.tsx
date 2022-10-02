import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { data } from './cardsData';
import Card from './components/common/Card';
import StatsPreviewCard from './pages/StatsPreviewCard';
import { HashRouter,Routes,Route } from 'react-router-dom'
import Meta, { MetaProps } from './components/common/Meta';

export const Main = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<App/>} />
          <Route path='/statsCardPreview' element={<StatsPreviewCard/>} />
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
    <main className="container position-relative min-vh-100">
      <h1 role={"heading"} className="display-5 text-center py-2 header"> FRONTEND DESIGNS </h1>
      <div className="row">
        <div className="col">
          {data.map((val) => {
            const { cardUrl, imgUrl, title, id } = val;
            return(
              <Card cardUrl={cardUrl} imgUrl={imgUrl} title={title} key={id} />
            )
          })}
        </div>
      </div>
    </main>
      <footer className="attribution position-fixed bottom-0 py-2 w-100">
        Challenge by{' '}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
        >Frontend Mentor</a>. Coded by {' '}
        <a href="https://dushyantgoyal.herokuapp.com">Dushyant Goyal</a>.
      </footer>
    </>
  );
}
