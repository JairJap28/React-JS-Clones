import React, {
  useState,
  useEffect
} from 'react';
import './App.css';

// MUI Stuff
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const App = () => {

  const [countries, setCountries] = useState([]);

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

  return (
    <div className="app">

      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="">
              { countries.map(country => (
                <MenuItem 
                  key={country.value || country.name}
                  value={country.value}>{country.name}
                </MenuItem>  
              ))}
          </Select>
        </FormControl>
      </div>

      {/* Header */}
      {/* Title + Select input dropdown field */}


      {/* InfoBoxes */}
      {/* InfoBoxes */}
      {/* InfoBoxes */}
      
      {/* Table */}

      {/* Map */}
    </div>
  );
}

export default App;
