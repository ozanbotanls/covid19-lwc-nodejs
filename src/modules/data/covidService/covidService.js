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
        // latest date holds the up-to-date figures per country
        const countryLatest = this.getTotalsByCountry(countryName);
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

module.exports.getTotalsByCountry = (countryName) => {
    const countryData = this.getCovidFiguresByCountry(countryName);
    return countryData[countryData.length - 1];
};
