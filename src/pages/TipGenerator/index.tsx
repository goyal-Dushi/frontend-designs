/* eslint-disable import/no-cycle */
import React, { useMemo, useReducer } from 'react';
import styles from './index.module.css';
import ResultArea from './components/ResultArea';
import InputArea from './components/InputArea';
import TipLogo from '../../images/tipGenerator/logo.svg';
import { initialState, reducer } from './Reducer/tipReducer';
import { BillContext } from './context';

interface TipGeneratorProps {}

const TipGenerator: React.FC<TipGeneratorProps> = () => {
  const [inputVals, dispatchVal] = useReducer(reducer, initialState);

  const billContextVal = useMemo(
    () => ({ inputState: inputVals, updateInput: dispatchVal }),
    [inputVals, dispatchVal]
  );

  return (
    <div className={styles.tipWrapper}>
      <div className="logo pb-4">
        <img src={TipLogo} alt="Splitter" />
      </div>
      <div>
        <div className={`container-sm p-0 ${styles.mainContainer}`}>
          <BillContext.Provider value={billContextVal}>
            <InputArea />
            <ResultArea />
          </BillContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default TipGenerator;
