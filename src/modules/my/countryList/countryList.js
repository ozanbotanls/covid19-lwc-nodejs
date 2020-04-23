import { LightningElement } from 'lwc';
import { getAllCovidFigures } from 'data/covidService';
import { getCountryCodeByName } from 'data/countryService';

export default class CountryList extends LightningElement {
    countries = [];
    currentNavigationItem;
    get lastUpdated() {
        var today = new Date();
        var date =
            today.getDate() +
            '-' +
            (today.getMonth() + 1) +
            '-' +
            today.getFullYear();
        return date;
    }
    connectedCallback() {
        getAllCovidFigures().then((data) => {
            const countryData = [];
            data.forEach((name) => {
                let code = getCountryCodeByName(name);
                countryData.push({
                    name: name,
                    flagSrc: `https://www.countryflags.io/${code}/shiny/64.png`
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
        this.dispatchEvent(navigateEvent);
    }

    handlesearchCountry(event) {
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
        // locate the page at the top
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
}
