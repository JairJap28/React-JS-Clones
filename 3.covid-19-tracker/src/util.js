import React from 'react';
import numeral from 'numeral';
import {
    Circle,
    Popup
} from 'react-leaflet';

const casesTypeColor = {
    cases: {
        hex: "#CC1034",
        multiplier: 800,
    },
    recovered: {
        hex: "#7DD71D",
        multiplier: 1200,
    },
    deaths: {
        hex: "#FB4443",
        multiplier: 2000,
    }
};

export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a, b) => a.cases > b.cases ? -1 : 1);
}

export const showDataOnMap = (data, casesType='cases') => (
    data.map(country => (
        <Circle
            key={country.country + country.countryInfo.iso2}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColor[casesType].hex}
            fillColor={casesTypeColor[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColor[casesType].multiplier
            }>
            
            <Popup>
                <div>
                    <div
                        style={{ backgroundImage:`url(${country.countryInfo.flag})` }}
                    />
                    <div>{country.country}</div>
                    <div>Cases: {numeral(country.cases).format("0,0")}</div>
                    <div>Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div>Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ))
);