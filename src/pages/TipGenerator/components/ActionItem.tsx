/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState } from 'react';
import DollarIconImg from '../../../images/tipGenerator/icon-dollar.svg';
import PersonIconImg from '../../../images/tipGenerator/icon-person.svg';
import styles from '../index.module.css';
import { BillContext } from '../context';
import { useDebounce } from '../../../common/hooks/useDebounce';

type ActionItemProps = {
  for?: 'tipInput' | 'bill' | 'person';
};

const TIP_VALS = [5, 10, 15, 20, 25];

const ActionItem: React.FC<ActionItemProps> = (props) => {
  const { for: forType } = props;

  const context = useContext(BillContext);
  const { updateInput, inputState } = context;

  const [inputTipVal, setTipVal] = useState<number | string>('');
  const [inputBillVal, setBillVal] = useState<number | string>('');
  const [inputPersonVal, setPersonVal] = useState<number | string>('');

  const debouncedTipVal: number = +useDebounce(inputTipVal, 800);
  const debouncedBillpVal: number = +useDebounce(inputBillVal, 800);
  const debouncedPersonVal: number = +useDebounce(inputPersonVal, 800);

  useEffect(() => {
    updateInput?.({ type: 'tip', value: debouncedTipVal });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTipVal]);

  useEffect(() => {
    if (debouncedBillpVal !== 0) {
      updateInput?.({ type: 'bill', value: debouncedBillpVal });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedBillpVal]);

  useEffect(() => {
    if (debouncedPersonVal !== 0) {
      updateInput?.({ type: 'person', value: debouncedPersonVal });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPersonVal]);

  useEffect(() => {
    if (context?.inputState) {
      const {
        bill: contextBill,
        person: contextPerson,
        tip: contextTip,
      } = context.inputState;

      if (contextBill === 0 && contextPerson === 0 && contextTip === 0) {
        if (inputBillVal !== 0) {
          setBillVal('');
        }
        if (inputTipVal !== 0) {
          setTipVal('');
        }
        if (inputPersonVal !== 0) {
          setPersonVal('');
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.inputState]);

  if (!context) {
    return null;
  }

  const handleTip = (e: React.SyntheticEvent) => {
    const curTipVal = e.currentTarget.getAttribute('value');
    if (curTipVal && +curTipVal !== inputState.tip) {
      updateInput?.({ type: 'tip', value: +curTipVal });
      if (inputTipVal !== '') {
        setTipVal('');
      }
    }
  };

  const handleTipInput = (e: React.FormEvent<HTMLInputElement>) => {
    const curTipVal = e.currentTarget.value;
    if (curTipVal && curTipVal !== inputTipVal) {
      setTipVal(+curTipVal);
    } else {
      setTipVal('');
    }
  };

  const handleBillChange = (e: React.FormEvent<HTMLInputElement>) => {
    const billVal = e.currentTarget.value;
    if (billVal && billVal !== inputBillVal) {
      setBillVal(+billVal);
    } else {
      setBillVal('');
    }
  };

  const handlePersonChange = (e: React.FormEvent<HTMLInputElement>) => {
    const personVal = e.currentTarget.value;
    if (personVal && personVal !== inputPersonVal) {
      setPersonVal(+personVal);
    } else {
      setPersonVal('');
    }
  };

  if (forType === 'bill') {
    return (
      <div>
        <div className="d-flex justify-content-between">
          <label htmlFor="bill" className="form-label">
            {' '}
            Bill{' '}
          </label>
          {inputBillVal === 0 && (
            <label htmlFor="bill" className={styles.formLabelError}>
              Can&apos;t be zero
            </label>
          )}
        </div>
        <div
          className={`input-group ${inputBillVal === 0 ? styles.error : ''}`}
          data-id="bill"
        >
          <span
            className={`input-group-text ${styles.inputIcon} ${styles.success}`}
          >
            <img src={DollarIconImg} alt={forType} height="20px" width="auto" />
          </span>
          <input
            type="number"
            value={inputBillVal}
            onChange={handleBillChange}
            className="form-control fs-5"
            id="bill"
            name="bill"
            aria-label="bill"
          />
        </div>
      </div>
    );
  }

  if (forType === 'person') {
    return (
      <div>
        <div className="d-flex justify-content-between">
          <label htmlFor="people" className="form-label">
            {' '}
            Number of People{' '}
          </label>
          {inputPersonVal === 0 && (
            <label htmlFor="people" className={styles.formLabelError}>
              {' '}
              Can&apos;t be zero{' '}
            </label>
          )}
        </div>
        <div
          className={`input-group ${inputPersonVal === 0 ? styles.error : ''}`}
          data-id="person"
        >
          <span className={`${styles.inputIcon} input-group-text`}>
            <img src={PersonIconImg} alt={forType} height="20px" width="auto" />
          </span>
          <input
            type="number"
            value={inputPersonVal}
            onChange={handlePersonChange}
            className="form-control fs-5"
            id="people"
            name="people"
            aria-label="people"
          />
        </div>
      </div>
    );
  }

  if (forType === 'tipInput') {
    return (
      <div className="container px-0">
        <div>
          <div className="col px-0">
            {' '}
            <label htmlFor="tip"> Select Tip % </label>{' '}
          </div>
        </div>
        <div className={`${styles.tipGrid} mt-2`}>
          {TIP_VALS.map((tip) => (
            <button
              key={`${tip}%`}
              type="button"
              onClick={handleTip}
              value={tip}
              className={`${styles.tipBtn} ${tip === inputState.tip ? styles.tipActive : ''}`}
              name="tip-val"
            >
              {tip}%
            </button>
          ))}
          <input
            type="number"
            value={inputTipVal}
            onChange={handleTipInput}
            placeholder="Custom"
            className="form-control fs-5"
            id="tip"
            name="tip"
            aria-label="tip"
          />
        </div>
      </div>
    );
  }

  return null;
};

export default ActionItem;
