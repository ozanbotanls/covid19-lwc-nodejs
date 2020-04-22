import { LightningElement } from 'lwc';

export default class App extends LightningElement {
    countryName;
    state;

    constructor() {
        super();
        this.state = 'list';
        window.history.replaceState('list', null, '');
        window.onpopstate = (event) => {
            if (event.state) {
                this.state = event.state;
            }
        };
    }

    handleCountryClick(event) {
        this.countryName = event.detail;
        this.state = 'details';
        window.history.pushState('details', null);
    }

    get isStateList() {
        return this.state === 'list';
    }
    get isStateDetails() {
        return this.state === 'details';
    }
}
