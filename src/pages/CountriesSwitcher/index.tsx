import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Meta, { MetaProps } from '../../components/common/Meta';
import { CountryCardDetails } from './Type';
import styles from './index.module.css';
import './global.css';
import CountryCard from './components/CountryCard';
import DarkMode from '../../components/common/icons/DarkMode';
import LightMode from '../../components/common/icons/LightMode';
import PageLoader from '../../components/common/PageLoader';
import { countriesSwiththemeInitialVal } from './reducer/themeReducer';

interface CountriesSwitcherProps {}

export const CountriesSwitcherThemeContext = createContext(
  countriesSwiththemeInitialVal
);

const metaData: MetaProps = {
  fontUrl: 'https://fonts.google.com/specimen/Nunito+Sans',
  title: 'Countries Details',
  desc: 'Search About all details related to any Country in the world! Sort them on basis of Region or search in the input field!',
  keywords: 'REST API, Country details, About Countries',
};

const fetchData = async (api: string): Promise<any> => {
  try {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const CountriesSwitcher: React.FC<CountriesSwitcherProps> = () => {
  const [cardData, setCardData] = useState<CountryCardDetails[]>([]);
  const [countryName, setCountryName] = useState('');
  const [regionVal, setRegionVal] = useState<string>('');
  // const [mode, setMode] = useState('light');
  const [loading, setLoading] = useState(false);
  const { theme, dispatchTheme } = useContext(CountriesSwitcherThemeContext);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const region = useMemo(() => params.get('region'), [params]);

  const handleInputChange = (e: React.SyntheticEvent) => {
    const { value } = e.currentTarget as HTMLInputElement;
    setTimeout(async () => {
      await fetchData(`https://restcountries.com/v3.1/name/${value}`).then(
        (res) => setCardData(res)
      );
    }, 1000);
  };

  const handleRegionSelect = async (e: React.SyntheticEvent) => {
    const { value } = e.currentTarget as HTMLSelectElement;

    setRegionVal(value);

    // if (!value) {
    //   setCardData(countriesData as unknown as CountryCardDetails[]);
    //   return;
    // }

    navigate(`/countries?region=${value.toLocaleLowerCase()}`);
  };

  const handleModeSwitch = () => {
    if (theme === 'light') {
      // setMode('dark');
      dispatchTheme('dark');
      return;
    }

    dispatchTheme('light');
    // setMode('light');
  };

  useEffect(() => {
    const fetchDataForAllCountries = async () => {
      try {
        setLoading(true);
        const jsonData = await fetchData('https://restcountries.com/v3.1/all');
        setCardData(jsonData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (!region) {
      fetchDataForAllCountries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchDataForRegion = async () => {
      try {
        if (region) {
          setLoading(true);
          const jsonData = await fetchData(
            `https://restcountries.com/v3.1/region/${region}`
          );

          if (!regionVal) {
            setRegionVal(region);
          }

          setCardData(jsonData);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (region) {
      fetchDataForRegion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region]);

  return (
    <>
      <Meta {...metaData} />
      {loading && <PageLoader />}
      <header className={`py-3 ${theme}-mode`}>
        <div className="container d-flex align-items-center justify-content-between container-fluid">
          <h3>Where in the World?</h3>
          <div>
            <button
              type="button"
              onClick={handleModeSwitch}
              className="border-0 btn"
            >
              {theme === 'light' ? (
                <>
                  <DarkMode /> <span> Dark Mode </span>
                </>
              ) : (
                <>
                  {' '}
                  <LightMode /> <span> Light Mode </span>
                </>
              )}{' '}
            </button>
          </div>
        </div>
      </header>
      <main className={`${theme}-mode`}>
        <div className="overflow-hidden container container-fluid">
          <div className="d-flex align-items-center justify-content-between">
            <div className="input-group mb-3 w-50">
              <span className="input-group-text" id="basic-addon1">
                &#x1F50E;
              </span>
              <input
                type="text"
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
                <option value="">Filter by Region</option>
                <option value="Africa">Africa</option>
                <option value="America">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
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
    </>
  );
};

export default CountriesSwitcher;
