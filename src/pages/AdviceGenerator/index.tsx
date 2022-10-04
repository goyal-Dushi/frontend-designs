import React, { useEffect, useState } from "react";
import adviceIcon from '../../images/adviceGenerator/icon-dice.svg';
import styles from './index.module.css';

export interface AdviceGeneratorProps {};

type AdviceState = {
    id: number;
    advice: string;
}

const AdviceGenerator: React.FC<AdviceGeneratorProps> = () => {

    const [data, setData] = useState<AdviceState|null>(null);

    const handleAdvice = async () => {
       const { slip }  = await fetch('https://api.adviceslip.com/advice', {
        method: 'GET'
       }).then((res) => res).then(res => res.json());
       const data: AdviceState = {...slip};
       setData(data);
    }

    useEffect(() => {
        handleAdvice();
    }, []);

    return(
        <div role={"main"} className={styles.mainWrapper} >
            <div className={styles.adviceBox}>
                <span className={styles.adviceHeader}>
                    Advice #{data?.id}  
                </span>
                {data?.advice ? (
                    <p className={styles.adviceBody}>
                        {data?.advice}
                    </p>
                ): (
                        <p className={styles.adviceBody}>
                            Loading...
                        </p>
                )}
                <div className={styles.dividerBox}>
                    <img alt="divider" />
                </div>
                <button type="button" onClick={() => handleAdvice()} 
                className={styles.adviceBtn}>
                    <img src={adviceIcon} alt="icon-dice" className={styles.diceIcon} />
                </button>
            </div>
        </div>
    )
}

export default AdviceGenerator;