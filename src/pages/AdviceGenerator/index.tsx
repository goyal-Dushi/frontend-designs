import React, { useEffect, useState } from 'react';
import Meta, { MetaProps } from '../../common/components/Meta';
import adviceIcon from '../../images/adviceGenerator/icon-dice.svg';
import styles from './index.module.css';

export interface AdviceGeneratorProps {}

type AdviceState = {
  id: number;
  advice: string;
};

const metaData: MetaProps = {
  title: 'Advice Generator App',
  desc: 'Advice Generator App using React js',
  keywords:
    'Advice Generator, React App, Advice Generator React App, Generate Advice',
  fontUrl:
    'https://fonts.googleapis.com/css2?family=Manrope:wght@700&display=swap',
};

const AdviceGenerator: React.FC<AdviceGeneratorProps> = () => {
  const [data, setData] = useState<AdviceState | null>(null);

  const handleAdvice = async () => {
    const { slip } = await fetch('https://api.adviceslip.com/advice', {
      method: 'GET',
    })
      .then((res) => res)
      .then((res) => res.json());
    const data: AdviceState = { ...slip };
    setData(data);
  };

  useEffect(() => {
    handleAdvice();
  }, []);

  return (
    <>
      <Meta {...metaData} />
      <div role="main" className={styles.mainWrapper}>
        <div className={styles.adviceBox}>
          <span className={styles.adviceHeader}>Advice #{data?.id}</span>
          {data?.advice ? (
            <p className={styles.adviceBody}>{data?.advice}</p>
          ) : (
            <p className={styles.adviceBody}>Loading...</p>
          )}
          <div className={styles.dividerBox}>
            <img alt="divider" />
          </div>
          <button
            type="button"
            onClick={() => handleAdvice()}
            className={styles.adviceBtn}
          >
            <img src={adviceIcon} alt="icon-dice" className={styles.diceIcon} />
          </button>
        </div>
      </div>
    </>
  );
};

export default AdviceGenerator;
