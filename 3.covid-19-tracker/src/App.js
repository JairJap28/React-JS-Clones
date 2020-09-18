import React, {
  useState,
  useEffect
} from 'react';
import './App.css';

// Components
import InfoBox from './InfoBox';
import Map from './Map';

// MUI Stuff
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
        ))

        setCountries(countries)
      });
    }

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  }

  return (
    <div className="app">

      <div className="app__header">

        <div className="app__left">
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
          <InfoBox title="Active Cases" cases={123} total={1000} />
          <InfoBox title="Recovered" cases={1234} total={2000} />
          <InfoBox title="Deaths" cases={12345} total={3000} />
        </div>

        <Map />
      </div>
      <Card className="app__right">
        {/* Table */}
        {/* Graph */}
      </Card>
    </div>
  );
}

export default App;
