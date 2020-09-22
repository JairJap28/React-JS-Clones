import React, {
  useState,
  useEffect
} from 'react';
import axios from 'axios';
import "leaflet/dist/leaflet.css";
import './App.css';
import { sortData } from './util';

// Components
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import LineGraph from './LineGraph';

// MUI Stuff
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const corsUrl = 'https://cors-anywhere.herokuapp.com/';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.880746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    axios.get(`${corsUrl}https://disease.sh/v3/covid-19/all`)
      .then(({ data }) => {
        setCountryInfo(data)
      })
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      axios.get(`${corsUrl}https://disease.sh/v3/covid-19/countries`)
      .then(({ data }) => {
        const countries = data.map((country) => (
              {
                name: country.country,
                value: country.countryInfo.iso2
              }
            ))

            const sortedData = sortData(data);

        setTableData(sortedData);
        setCountries(countries)
      })
    }

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = countryCode === 'worldwide' ? 
                `https://disease.sh/v3/covid-19/all` :
                `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await axios.get(`${corsUrl}${url}`)
    .then(({ data }) => {
      setCountryInfo(data)
      setCountry(countryCode);
    })
  }

  return (
    <div className="app">

      <div className="app__left">

        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem key="worldwide" value="worldwide">Worldwide</MenuItem>
              {countries.map(country => (
                <MenuItem
                  key={country.value || country.name}
                  value={country.value}>{country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox 
            title="Active Cases" 
            cases={countryInfo.todayCases} 
            total={countryInfo.cases} />
          <InfoBox 
            title="Recovered" 
            cases={countryInfo.todayRecovered} 
            total={countryInfo.recovered} />
          <InfoBox 
            title="Deaths" 
            cases={countryInfo.todayDeaths} 
            total={countryInfo.deaths} />
        </div>

        <Map center={mapCenter} zoom={mapZoom}/>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          <Table countries={tableData}/>
          <div className="app__graph">
            <h3>Worldwide new cases</h3>
            <LineGraph />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
