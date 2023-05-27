import React, { createContext, useReducer } from "react";
import styles from './index.module.css';
import ResultArea from "./components/ResultArea";
import InputArea, { InputState } from "./components/InputArea";
import TipLogo from '../../images/tipGenerator/logo.svg';
import { ActionType, initialState, reducer } from "./Reducer/tipReducer";

interface TipGeneratorProps {};

export const BillContext = createContext<{ inputState: InputState, updateInput: React.Dispatch<ActionType> | null }>({
    inputState: initialState,
    updateInput: null,
});

const TipGenerator:React.FC<TipGeneratorProps> = () => {

    const [inputVals, dispatchVal] = useReducer(reducer, initialState); 

    return(
        <div className={styles.tipWrapper}>
            <div className="logo pb-4">
                <img src={TipLogo} alt="Splitter" />
            </div>
            <div>
                <div className={`container-sm p-0 ${styles.mainContainer}`}>
                    <BillContext.Provider value={{ inputState: inputVals, updateInput: dispatchVal }} >
                        <InputArea />
                        <ResultArea />
                    </BillContext.Provider>
                </div>
            </div>
        </div>
    )
}

export default TipGenerator;