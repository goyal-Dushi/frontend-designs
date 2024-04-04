/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Meta, { MetaProps } from '../../components/common/Meta';
import { CountryCardDetails } from './Type';
import styles from './index.module.css';
import './global.css';
import CountryCard from './components/CountryCard';
import PageLoader from '../../components/common/PageLoader';
import { useApi } from '../../hooks/useApi';
import { useDebounce } from '../../hooks/useDebounce';
import { CountriesSwitcherThemeContext } from './reducer/themeReducer';
import ThemeHandler from './components/ThemeHandler';
import SearchIcon from '../../components/common/icons/SearchIcon';

interface CountriesSwitcherProps {}

const metaData: MetaProps = {
  fontUrl: 'https://fonts.google.com/specimen/Nunito+Sans',
  title: 'Countries Details',
  desc: 'Search About all details related to any Country in the world! Sort them on basis of Region or search in the input field!',
  keywords: 'REST API, Country details, About Countries',
};

const CountriesSwitcher: React.FC<CountriesSwitcherProps> = () => {
  const [cardData, setCardData] = useState<CountryCardDetails[]>([]);
  const [countryName, setCountryName] = useState('');
  const [regionVal, setRegionVal] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const context = useContext(CountriesSwitcherThemeContext);
  const { theme } = context;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { fetchApiData } = useApi();
  const debouncedInputVal = useDebounce(countryName, 800);

  const region = useMemo(() => params.get('region'), [params]);

  const handleInputChange = (e: React.SyntheticEvent) => {
    const { value } = e.currentTarget as HTMLInputElement;
    setCountryName(value);
  };

  const handleRegionSelect = async (e: React.SyntheticEvent) => {
    const { value } = e.currentTarget as HTMLSelectElement;

    setRegionVal(value);

    navigate(`/countries?region=${value.toLocaleLowerCase()}`, {
      replace: true,
    });
  };

  const fetchAllCountriesData = async () => {
    const res = await fetchApiData('https://restcountries.com/v3.1/all');
    if (res.data) {
      setCardData(res.data);
    }
  };

  const fetchCountriesByRegion = async (endpoint: string) => {
    if (endpoint === 'all') {
      await fetchAllCountriesData();
      return;
    }

    const url = `https://restcountries.com/v3.1/region/${regionVal}`;
    const res = await fetchApiData(url);
    setCardData(res.data);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        if (debouncedInputVal) {
          const res = await fetchApiData(
            `https://restcountries.com/v3.1/name/${debouncedInputVal}`
          );
          if (res.error) {
            throw new Error(res.error);
          }

          setCardData(res.data);
        } else if (regionVal) {
          await fetchCountriesByRegion(regionVal);
        } else {
          await fetchAllCountriesData();
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputVal]);

  useEffect(() => {
    if (region) {
      setRegionVal(region);
    }
  }, [region]);

  useEffect(() => {
    (async () => {
      try {
        if (regionVal) {
          setLoading(true);
          await fetchCountriesByRegion(regionVal);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionVal]);

  return (
    <div
      className={`vh-100 overflow-scroll countries-switcher-wrapper ${theme}-mode`}
    >
      <Meta {...metaData} />
      {loading && <PageLoader />}
      <header className={`py-3 ${theme}-mode shadow-sm mb-2`}>
        <div className="container d-flex align-items-center justify-content-between container-fluid">
          <h3>Where in the World?</h3>
          <ThemeHandler />
        </div>
      </header>
      <main className={`${theme}-mode`}>
        <div className="overflow-hidden container container-fluid">
          <div className="d-flex align-items-center justify-content-between mt-4">
            <div className="input-group mb-3 w-50">
              <label htmlFor="country-name" className="input-group-text">
                <SearchIcon />
              </label>
              <input
                type="text"
                id="country-name"
                name="country-name"
                className="form-control"
                placeholder="Search for a country ..."
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group mb-3 w-25">
              <select
                onChange={handleRegionSelect}
                value={regionVal}
                className="form-select form-select-md"
              >
                <option disabled value="">
                  Filter by Region
                </option>
                <option value="all">All</option>
                <option value="africa">Africa</option>
                <option value="america">America</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="oceania">Oceania</option>
              </select>
            </div>
          </div>
          <div className={styles.countryCardsArea}>
            {cardData?.map((data) => (
              <CountryCard key={data.name.common} {...data} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CountriesSwitcher;
