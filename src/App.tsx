import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import { data } from './cardsData';
import Card from './common/components/Card';
import Meta, { MetaProps } from './common/components/Meta';

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

export default App;
