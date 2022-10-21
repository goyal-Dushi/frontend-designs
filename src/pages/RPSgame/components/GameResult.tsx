/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { ResultContext } from "..";
import styles from './gameResult.module.css';
import GameTags, { GameTagProps } from "./GameTags";

export interface GameResultProps {
    setScore: React.Dispatch<React.SetStateAction<number | null>>;
};

const solution = [
    [-1,1,0],
    [1,-1,2],
    [0,2,-1]
];

const rps_mapping = ["rock", "paper","scissor"];

const getRandomRes = (max: number) => {
    return Math.floor(Math.random()*max);
};

const GameResult: React.FC<GameResultProps> = ({setScore}) => {

    const context = useContext(ResultContext);
    const [houseRes, setHouseRes] = useState<string|null>(null);
    const [winText, setWinText] = useState<string|null>(null);

    useEffect(() => {
        if(context?.result){
            setTimeout(() => {
                const res = getRandomRes(3);
                setHouseRes(rps_mapping[res]);
            }, 500);
        }
    }, [context?.result]);


    useEffect(() => {
        if(houseRes){
            setTimeout(() => {
                const indexOfUserSoln = rps_mapping.indexOf(context?.result as string);
                const computerSoln = rps_mapping.indexOf(houseRes);
                const final = solution[indexOfUserSoln][computerSoln];
                if(final === -1){
                    setWinText('DRAW');
                    return;
                }
                if(rps_mapping[final].trim() === houseRes.trim()){
                    setWinText('YOU LOSE');
                    return;
                }else {
                    const score = window.localStorage.getItem('score');
                    let finalScore: number = 1;
                    if(score){
                        finalScore = +score + 1;
                    }
                    window.localStorage.setItem('score', finalScore.toString());
                    setWinText('YOU WIN');
                    setScore(finalScore);
                } 
            }, 1000);
        }
    },[houseRes]);  

    const handlePlayAgain = () => {
        setWinText(null);
        setHouseRes(null);
        context?.setResult(null);
    }

    return(
        <div className={`${styles.result_container} container-sm d-flex align-items-center justify-content-center px-0`}>
            <div className="row w-100">
                <div className="col-lg-4 col-6 order-lg-1 order-1 text-center pe-0">
                    <p className={styles.tag_heading_1}> YOU PICKED </p>
                    <div className={styles.tag_area}>
                        <GameTags big classes={`mx-auto`} type={context?.result as GameTagProps['type']} />
                    </div>
                </div>
                <div className={`${styles.res_text_container} col-lg-4 col-12 order-lg-2 order-3 p-0 d-flex align-items-center justify-content-center flex-column`}>
                    {winText && (
                        <>
                            <h4 className={styles.game_stat_header}> {winText} </h4>
                            <button onClick={handlePlayAgain} className={styles.play_again_btn}> PLAY AGAIN </button>
                        </>
                    )}
                    
                </div>
                <div className="col-lg-4 col-6 order-lg-3 order-2 text-center ps-0">
                    <p className={styles.tag_heading_2}> THE HOUSE PICKED </p>
                    <div className={styles.tag_area}>
                        {houseRes ? (   
                            <GameTags big classes={`mx-auto`} type={houseRes as GameTagProps['type']} />
                        ):(
                            <div className={`${styles.gametag_placeholder} mx-auto my-auto`}></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameResult;