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

  const defaultCenter = { lat: 34.80746, lng: -40.4796};

  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [mapZoom, setMapZoom] = useState(3);
  const [casesType, setCasesType] = useState("cases");

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
        setMapCountries(data);
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
      try {
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      } catch (error) {
        setMapCenter(defaultCenter);
        setMapZoom(3);
      }
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
            active={casesType === "cases"}
            onClick={e => setCasesType('cases')}
            type={1} 
            title="Active Cases" 
            cases={countryInfo.todayCases} 
            total={countryInfo.cases} />
          <InfoBox 
            active={casesType === "recovered"}
            onClick={e => setCasesType('recovered')}
            type={2}
            title="Recovered" 
            cases={countryInfo.todayRecovered} 
            total={countryInfo.recovered} />
          <InfoBox 
            active={casesType === "deaths"}
            onClick={e => setCasesType('deaths')}
            type={3}
            title="Deaths" 
            cases={countryInfo.todayDeaths} 
            total={countryInfo.deaths} />
        </div>

        <Map 
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}/>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          <Table countries={tableData}/>
          <div className="app__graph">
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType}/>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
