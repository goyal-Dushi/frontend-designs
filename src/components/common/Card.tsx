import React from "react";
import {Link} from 'react-router-dom';
import styles from './card.module.css';

export interface CardProps {
    imgUrl: string;
    cardUrl:string;
    title: string;
}

const Card:React.FC<CardProps> = (props) => {

    const { cardUrl, imgUrl, title } = props;

    return(
        <div className={`${styles.gridCard} card mx-auto`}>
            <img src={imgUrl} alt="stats-preview-card" className="card-img-top" />
            <div className={`${styles.hoverBody} card-body position-relative`}>
                <h5 className="card-title text-capitalize"> {title} </h5>
                <Link className="btn btn-outline-primary" to={cardUrl} >
                    <span> View </span>
                </Link>
            </div>
        </div>
    )
}

export default Card;