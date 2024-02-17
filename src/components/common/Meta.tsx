import React from 'react';
import { Helmet } from 'react-helmet';
import dgIcon from '../../images/favicon.png';
import mentorIcon from '../../images/favicon-32x32.png';

export interface MetaProps {
  title: string;
  desc: string;
  keywords: string;
  pgType?: string;
  fontUrl?: string;
}

const Meta: React.FC<MetaProps> = (props) => {
  const { desc, keywords, title, pgType, fontUrl } = props;
  let iconUrl = '';
  if (pgType === 'main') {
    iconUrl = dgIcon;
  } else {
    iconUrl = mentorIcon;
  }

  return (
    <Helmet>
      <title> {title} </title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={keywords} />
      {fontUrl && <link rel="stylesheet" href={fontUrl} />}
      <link rel="icon" href={iconUrl} type={'image/png'} sizes={'32x32'} />
    </Helmet>
  );
};

export default Meta;
