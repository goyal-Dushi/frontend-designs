import React from "react";
import {Link} from 'react-router-dom';

export interface CardProps {
    imgUrl: string;
    cardUrl:string;
    title: string;
}

const Card:React.FC<CardProps> = (props) => {

    const { cardUrl, imgUrl, title } = props;

    return(
        <div className="card w-25">
            <img src={imgUrl} alt="stats-preview-card" className="card-img-top" />
            <div className="card-body hover-body">
                <h5 className="card-title text-capitalize"> {title} </h5>
                <Link className="btn btn-primary" to={cardUrl} >
                    <a> View </a>
                </Link>
            </div>
        </div>
    )
}

export default Card;