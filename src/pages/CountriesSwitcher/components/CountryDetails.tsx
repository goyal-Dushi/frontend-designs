import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CountryCardDetails, borderMap } from '../Type';
import './countryDetail.css';
import PageLoader from '../../../common/components/PageLoader';
import Meta, { MetaProps } from '../../../common/components/Meta';
import { CountriesSwitcherThemeContext } from '../reducer/themeReducer';

export interface CountryDetailsProps {}

const metaData: MetaProps = {
  fontUrl: 'https://fonts.google.com/specimen/Nunito+Sans',
  title: 'Country Data',
  desc: 'Get the details related to a particular country. Also, search of bordering countries by clicking on respecive badges!',
  keywords: 'REST API, Country details, About Countries',
};

const CountryDetails: React.FC<CountryDetailsProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(CountriesSwitcherThemeContext);

  const { state } = location;
  const { countryDetail }: { countryDetail: CountryCardDetails } = state;
  const {
    flags,
    population,
    borders,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    name,
  } = countryDetail;

  const handleBack = (): void => {
    navigate(-1);
  };

  const handleBorderClick = async (code: string): Promise<void> => {
    try {
      setLoading(true);
      const countryData = await fetch(
        `https://restcountries.com/v3.1/alpha/${code}`
      ).then((res) => res.json());

      navigate(
        {
          pathname: `/countries/${borderMap.get(code) || code}`,
        },
        {
          state: {
            countryDetail: countryData[0],
          },
        }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vh-100 overflow-hidden">
      {loading && <PageLoader />}
      <Meta {...metaData} />
      <main className={`country-details overflow-scroll ${theme}-mode`}>
        <div className="container container-fluid vh-100">
          <div className="row pt-5">
            <div className="col sm-12">
              <button
                type="button"
                onClick={handleBack}
                className="btn btn-outline-secondary"
              >
                Back
              </button>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6 col-sm-12">
              <img
                className="border"
                height="100%"
                width="100%"
                src={flags.svg}
                alt={flags.alt}
              />
            </div>
            <div className="col-md-6 col-sm-12 country-detail mb-4">
              <h4> {name.common} </h4>
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <p>
                      <strong> Official Name: </strong> {name.official}
                    </p>
                    <p>
                      <strong>Population: </strong> {population}
                    </p>
                    <p>
                      <strong>Region: </strong> {region}
                    </p>
                    <p>
                      <strong>Sub Region: </strong> {subregion}
                    </p>
                    <p>
                      <strong>Capital</strong> {capital}
                    </p>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <p>
                      <strong>Top Level Domain: </strong>
                      {tld.toString()}
                    </p>
                    <p>
                      <strong> Currencies: </strong>
                      {Object.entries(currencies).map(([key, value]) => (
                        <span key={key}>
                          {value.name} (<b>{value.symbol}</b>) |
                        </span>
                      ))}
                    </p>
                    <p>
                      <strong> Languages: </strong>
                      {Object.values(languages).map((language) => (
                        <span key={language}> {language} , </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
              {borders?.length ? (
                <div className="container">
                  <div className="row">
                    <div className="col-sm-12">
                      <p className="d-flex align-self-baseline gap-2">
                        <strong>Borders: </strong>{' '}
                        <div className="d-flex align-items-baseline justify-content-start gap-3 flex-wrap">
                          {borders?.map((code: string) => {
                            if (borderMap.get(code)) {
                              return (
                                <button
                                  key={code}
                                  type="button"
                                  style={{ fontSize: '12px' }}
                                  onClick={() => handleBorderClick(code)}
                                  className="btn btn-sm px-3 shadow btn-outline-secondary border-0"
                                >
                                  {borderMap.get(code)}
                                </button>
                              );
                            }

                            return null;
                          })}
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CountryDetails;
