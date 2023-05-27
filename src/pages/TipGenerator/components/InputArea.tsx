import React from "react";
import styles from "../index.module.css";
import ActionItem from "./ActionItem";

interface InputAreaProps {}

export type InputState = {
    tip: number;
    bill: number;
    person: number;
};

const InputArea: React.FC<InputAreaProps> = (props) => {

    return( 
        <div className={styles.inputArea}>
            <ActionItem for="bill" />
            <ActionItem for="tipInput" />
            <ActionItem for="person" />
        </div>
    )
}

export default InputArea;