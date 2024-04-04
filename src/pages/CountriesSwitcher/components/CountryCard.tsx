import React from 'react';
import { Link } from 'react-router-dom';
import { CountryCardDetails } from '../Type';
import styles from './countryCard.module.css';

interface CountryCardProps extends CountryCardDetails {}

const CountryCard: React.FC<CountryCardProps> = (props) => {
  const { ...rest } = props;
  const { region, name, population, capital, flags } = rest;

  return (
    <Link
      to={{
        pathname: `/countries/${name.official}`,
      }}
      state={{
        countryDetail: rest,
      }}
      className={styles.countryCard}
    >
      <div className="card">
        <img src={flags.svg} className="card-img-top" alt={flags.alt} />
        <div className="card-body border-top">
          <h5 className="card-title"> {name.official} </h5>
          <div className="card-desc">
            <p className={styles.cardDescInfo}>
              <strong> Population: </strong> {population}
            </p>
            <p className={styles.cardDescInfo}>
              <strong> Region: </strong> {region}
            </p>
            <p className={styles.cardDescInfo}>
              <strong> Capital: </strong> {capital}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
