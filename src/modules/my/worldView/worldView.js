import { LightningElement } from 'lwc';
import { getWorldTotal } from '../../data/covidService/covidService';

export default class WorldView extends LightningElement {
    worldTotals = {};
    connectedCallback() {
        this.worldTotals = getWorldTotal();
    }
}
