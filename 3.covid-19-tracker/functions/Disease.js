const fetch = require('node-fetch');

const urlAll = 'https://disease.sh/v3/covid-19/all';
const urlCountries = 'https://disease.sh/v3/covid-19/countries';
const urlHistorical = 'https://disease.sh/v3/covid-19/historical/all?lastdays=120';

const getAll = (req, res) => {
    return request(req, res, urlAll);
}

const getCountries = (req, res) => {
    return request(req, res, urlCountries);
}

const getSpecificCountry = (req, res) => {
    const url = `${urlCountries}/${req.query.country}`;
    return request(req, res, url);
}

const getHistorical = (req, res) => {
    return request(req, res, urlHistorical);
}

const request = (req, res, url) => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        return res.status(200).json(data);
    })
    .catch(error => {
        return res.status(400).json(error);
    });
}

module.exports = { 
    getAll,
    getCountries,
    getHistorical,
    getSpecificCountry
};