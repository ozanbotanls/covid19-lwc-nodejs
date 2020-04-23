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

module.exports.getWorldTotal = () => {
    let totalConfirmed = (totalDeath = totalRecovered = 0);
    Object.keys(countryFigures).forEach((countryName) => {
        const countryData = this.getCovidFiguresByCountry(countryName);
        const countryLatest = countryData[countryData.length - 1];
        totalConfirmed += countryLatest.confirmed;
        totalDeath += countryLatest.deaths;
        totalRecovered += countryLatest.recovered;
    });
    return {
        totalConfirmed: totalConfirmed,
        totalDeath: totalDeath,
        totalRecovered: totalRecovered
    };
};
