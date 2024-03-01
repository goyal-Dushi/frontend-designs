import React, { useEffect, useMemo, useState } from 'react';
import logo from '../../images/rockPaperGame/logo.svg';
import styles from './index.module.css';
import Meta, { MetaProps } from '../../components/common/Meta';
import RulesDialog from './components/RulesDialog';
import GameResult from './components/GameResult';
import TagSelectScreen from './components/TagSelectScreen';
import { ResultContext } from './context';

export interface RPSpageProps {}

const metaData: MetaProps = {
  fontUrl:
    'https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@700&display=swap',
  title: 'Rock, Paper and Scissor Game',
  desc: 'Rock, Paper and Scissor game using React Js',
  keywords:
    'Game using React js, React App, Rock, paper and scissor game using React Js, React Js game',
};

const RPSpage: React.FC<RPSpageProps> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const resultContextVal = useMemo(
    () => ({ result, setResult }),
    [result, setResult]
  );

  useEffect(() => {
    const localScore = window.localStorage.getItem('score');
    if (localScore) {
      setScore(+localScore);
    }
  }, []);

  const handleDialog = () => {
    setOpen(true);
  };

  const handleReset = () => {
    window.localStorage.removeItem('score');
    setResult(null);
    setScore(0);
  };

  return (
    <>
      <Meta {...metaData} />
      <div className={`${styles.game_wrapper} min-vh-100`}>
        <div className="container-lg py-5">
          <header className={`${styles.game_header} w-75 mx-auto row`}>
            <div className="col p-0 my-auto">
              <img src={logo} alt="logo-header" />
            </div>
            <div className="col p-0 my-auto text-center">
              <button
                type="button"
                onClick={handleReset}
                className={`${styles.reset_btn}`}
              >
                {' '}
                RESET{' '}
              </button>
            </div>
            <div className="col p-0">
              <div
                className={`${styles.score_box} float-end text-center d-flex flex-column justify-content-between`}
              >
                <span className={`${styles.score_header}`}>SCORE</span>
                <h3 className="m-0"> {score || 0} </h3>
              </div>
            </div>
          </header>
          <ResultContext.Provider value={resultContextVal}>
            <main>
              {result ? (
                <GameResult setScore={setScore} />
              ) : (
                <TagSelectScreen />
              )}
              <RulesDialog setOpen={setOpen} open={open} />
            </main>
          </ResultContext.Provider>
          <footer className={`${styles.game_footer} w-100 bottom-0`}>
            <button
              type="button"
              onClick={handleDialog}
              className={`${styles.rules_button}`}
            >
              RULES
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default RPSpage;
