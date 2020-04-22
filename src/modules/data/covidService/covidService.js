const COVID_URL = 'https://pomber.github.io/covid19/timeseries.json';
let countryFigures = {};
module.exports.getAllCovidFigures = () =>
    fetch(COVID_URL)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            countryFigures = result;
            // return only country names as a list
            return Object.keys(countryFigures);
        });

module.exports.getCovidFiguresByCountry = (countryId) => {
    return countryFigures[countryId];
};
