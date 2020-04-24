import { LightningElement } from 'lwc';
import { getAllCovidFigures, getTotalsByCountry } from 'data/covidService';
import { getCountryCodeByName } from 'data/countryService';

export default class CountryList extends LightningElement {
    countries = [];
    currentNavigationItem;
    connectedCallback() {
        getAllCovidFigures().then((data) => {
            const countryData = [];
            data.forEach((name) => {
                let code = getCountryCodeByName(name);
                let countryTotals = getTotalsByCountry(name);
                countryData.push({
                    name: name,
                    flagSrc: `https://www.countryflags.io/${code}/shiny/64.png`,
                    totalConfirmed: countryTotals.confirmed,
                    totalDeath: countryTotals.deaths,
                    totalRecovered: countryTotals.recovered,
                    lastUpdated: countryTotals.date
                });
            });

            this.countries = this.allCountries = countryData;
        });
    }

    handleSelectCountry(event) {
        const countryName = event.currentTarget.dataset.country;
        const navigateEvent = new CustomEvent('navigate', {
            detail: countryName
        });
        // dispatch to app.js for it to pass this through countryDetails component
        this.dispatchEvent(navigateEvent);
    }

    handleSearchCountry(event) {
        let inputCountry = event.target.value.toLowerCase();
        this.countries = this.allCountries.filter((country) =>
            country.name.toLowerCase().includes(inputCountry)
        );
    }

    get isWorldMode() {
        return this.currentNavigationItem === 'World' ? true : false;
    }

    handleCategoryChange(event) {
        if (event) {
            if (this.currentNavigationItem !== event.detail) {
                this.currentNavigationItem = event.detail;
            } else {
                return;
            }
        }

        // if (this.currentNavigationItem === 'World') {
        //     window.scrollTo(0, document.body.scrollHeight);
        //     return;
        // }
        // locate the page at the top
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    updateColumnSorting(event) {
        let fieldName = event.target.value;
        let sortDirection = fieldName === 'name' ? 'asc' : 'desc';
        this.sortData(fieldName, sortDirection);
    }

    sortData(fieldName, sortDirection) {
        var data = JSON.parse(JSON.stringify(this.countries));
        //function to return the value stored in the field
        var key = (a) => a[fieldName];
        var reverse = sortDirection === 'asc' ? 1 : -1;
        data.sort((a, b) => {
            let valueA = key(a); // ? key(a).toLowerCase() : '';
            let valueB = key(b); // ? key(b).toLowerCase() : '';
            return reverse * ((valueA > valueB) - (valueB > valueA));
        });
        this.countries = data;
    }
}
