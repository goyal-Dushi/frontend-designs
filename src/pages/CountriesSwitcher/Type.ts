export interface CountryCardDetails {
  name: CountryName;
  tld: string[];
  callingCodes: string[];
  capital: string[];
  continents: string[];
  cioc: string;
  cca3: string;
  cca2: string;
  altSpellings: string[];
  subregion: string;
  region: string;
  population: number;
  latlng: [number, number];
  demonym: string;
  area: number;
  gini: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  flags: CountryFlag;
  currencies: Record<string, CountryCurrency>;
  languages: Record<string, string>;
  translations: Record<string, string>;
  regionalBlocs: CountryRegionalBlock[];
  maps: CountryMaps;
  independent: boolean;
}

export interface CountryMaps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface CountryFlag {
  alt: string;
  png: string;
  svg: string;
}

export interface CountryName {
  common: string;
  official: string;
}

export interface CountryCurrency {
  name: string;
  symbol: string;
}

export interface CountryRegionalBlock {
  acronym: string;
  name: string;
}

export const borderMap = new Map([
  ['DJI', 'Djibouti'],
  ['ETH', 'Ethiopia'],
  ['SDN', ''],
  ['GIN', ''],
  ['CIV', 'Ivory Coast'],
  ['SLE', 'Sierra Leone'],
  ['ITA', 'Italy'],
  ['KEN', 'Kenya'],
  ['AGO', ''],
  ['BWA', ''],
  ['COD', 'DR Congo'],
  ['MWI', ''],
  ['MOZ', 'Mozambique'],
  ['NAM', 'Namibia'],
  ['TZA', ''],
  ['ZWE', ''],
  ['BRA', 'Brazil'],
  ['COL', 'Colombia'],
  ['GUY', 'Guyana'],
  ['AFG', 'Afghanistan'],
  ['IRN', ''],
  ['KAZ', 'Kazakhstan'],
  ['UZB', 'Uzbekistan'],
  ['MNE', 'Montenegro'],
  ['GRC', ''],
  ['MKD', 'North Macedonia'],
  ['UNK', ''],
  ['BIH', 'Bosnia and Herzegovina'],
  ['HUN', 'Hungary'],
  ['SRB', 'Serbia'],
  ['SVN', ''],
  ['IRL', 'Ireland'],
  ['CAF', 'Central African Republic'],
  ['TCD', ''],
  ['EGY', 'Egypt'],
  ['ERI', 'Eritrea'],
  ['LBY', ''],
  ['SSD', 'South Sudan'],
  ['IDN', ''],
  ['CMR', 'Cameroon'],
  ['GAB', 'Gabon'],
  ['ARM', 'Armenia'],
  ['GEO', 'Georgia'],
  ['RUS', 'Russia'],
  ['TUR', 'Turkey'],
  ['SOM', 'Somalia'],
  ['UGA', 'Uganda'],
  ['BFA', ''],
  ['GHA', 'Ghana'],
  ['LBR', 'Liberia'],
  ['MLI', 'Mali'],
  ['GMB', ''],
  ['GNB', ''],
  ['MRT', ''],
  ['KHM', ''],
  ['CHN', 'China'],
  ['LAO', 'Laos'],
  ['GTM', ''],
  ['HND', ''],
  ['PAK', 'Pakistan'],
  ['TKM', 'Turkmenistan'],
  ['TJK', 'Tajikistan'],
  ['SXM', ''],
  ['BLR', 'Belarus'],
  ['EST', 'Estonia'],
  ['LTU', 'Lithuania'],
  ['BLZ', ''],
  ['SLV', ''],
  ['MEX', 'Mexico'],
  ['IRQ', 'Iraq'],
  ['SAU', ''],
  ['CZE', 'Czechia'],
  ['DEU', ''],
  ['SVK', 'Slovakia'],
  ['UKR', 'Ukraine'],
  ['TGO', ''],
  ['LVA', ''],
  ['POL', 'Poland'],
  ['AZE', 'Azerbaijan'],
  ['KGZ', 'Kyrgyzstan'],
  ['DZA', ''],
  ['MAR', 'Morocco'],
  ['ESH', ''],
  ['ESP', 'Spain'],
  ['MYS', ''],
  ['SUR', 'Suriname'],
  ['BGR', ''],
  ['MDA', 'Moldova'],
  ['CRI', ''],
  ['COG', ''],
  ['GNQ', ''],
  ['NGA', ''],
  ['AUT', 'Austria'],
  ['ALB', 'Albania'],
  ['NER', ''],
  ['SEN', 'Senegal'],
  ['AND', 'Andorra'],
  ['BEL', 'Belgium'],
  ['LUX', 'Luxembourg'],
  ['MCO', ''],
  ['CHE', ''],
  ['IND', 'India'],
  ['BOL', 'Bolivia'],
  ['CHL', ''],
  ['ECU', 'Ecuador'],
  ['HRV', ''],
  ['ROU', 'Romania'],
  ['MMR', ''],
  ['BTN', ''],
  ['HKG', 'Hong Kong'],
  ['NPL', ''],
  ['PRK', 'North Korea'],
  ['MAC', ''],
  ['MNG', ''],
  ['VNM', ''],
  ['PAN', 'Panama'],
  ['PER', 'Peru'],
  ['VEN', 'Venezuela'],
  ['TUN', 'Tunisia'],
  ['BRN', ''],
  ['THA', 'Thailand'],
  ['FRA', 'France'],
  ['GIB', ''],
  ['PRT', ''],
  ['GBR', 'United Kingdom'],
  ['ARG', 'Argentina'],
  ['LSO', ''],
  ['SWZ', 'Eswatini'],
  ['NOR', 'Norway'],
  ['SWE', 'Sweden'],
  ['FIN', 'Finland'],
  ['ISR', 'Israel'],
  ['SYR', 'Syria'],
  ['CAN', 'Canada'],
  ['HTI', ''],
  ['PRY', ''],
  ['DOM', 'Dominican Republic'],
  ['RWA', 'Rwanda'],
  ['ZMB', ''],
  ['USA', 'United States'],
  ['ZAF', ''],
  ['JOR', 'Jordan'],
  ['LBN', 'Lebanon'],
  ['PSE', ''],
  ['OMN', ''],
  ['GUF', ''],
  ['KWT', ''],
  ['QAT', 'Qatar'],
  ['ARE', ''],
  ['YEM', 'Yemen'],
  ['SMR', 'San Marino'],
  ['VAT', ''],
  ['URY', ''],
  ['BDI', 'Burundi'],
  ['BEN', 'Benin'],
  ['DNK', ''],
  ['NLD', ''],
  ['LIE', 'Liechtenstein'],
  ['NIC', ''],
  ['KOR', 'South Korea'],
  ['BGD', ''],
  ['MAF', ''],
  ['TLS', 'Timor-Leste'],
  ['PNG', 'Papua New Guinea'],
]);
