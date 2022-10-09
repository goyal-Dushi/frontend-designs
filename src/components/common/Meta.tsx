import React from "react";
import { Helmet } from 'react-helmet';

export interface MetaProps {
    title: string;
    desc: string;
    keywords: string;
    pgType? : string;
    fontUrl?: string;
};

const Meta: React.FC<MetaProps> = (props) => {

    const { desc, keywords, title, pgType, fontUrl } = props;
    let iconUrl = '';
    if(pgType === 'main'){
        iconUrl = require('../../images/favicon.png')
    }else{
        iconUrl = require('../../images/favicon-32x32.png')
    }

    return(
        <Helmet link={[
            {
                "rel": "icon",
                "type": "image/png",
                "href": iconUrl,
                "sizes": '32x32'
            }
        ]} >
            <title> {title} </title>
            <meta name="description" content={desc} />
            <meta name="keywords" content={keywords} />
            {fontUrl && (
                <link rel="stylesheet" href={fontUrl} />
            )}
        </Helmet>
    )
}

export default Meta;