import { LightningElement, api } from 'lwc';
import { getCovidFiguresByCountry } from 'data/covidService';

export default class CountryDetail extends LightningElement {
    countryDailyFigures = [];
    chart;
    chartjsInitialized = false;
    isLoading;

    @api
    set countryName(name) {
        this._countryName = name;
        this.countryDailyFigures = getCovidFiguresByCountry(name);
    }
    get countryName() {
        return this._countryName;
    }

    async loadChartJs() {
        await require('chart.js');
        const ctx = this.template
            .querySelector('canvas.chartCanvas')
            .getContext('2d');
        this.isLoading = true;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.chart = setTimeout(() => new window.Chart(ctx, this.config), 600);
        this.chartjsInitialized = true;
        this.isLoading = false;
        window.scrollTo(0, document.body.scrollHeight);
    }

    // setting up chart.js config when the component rendered
    renderedCallback() {
        if (this.chartjsInitialized) {
            return;
        }
        this.progress = this.template.querySelector(
            'progress.animationProgress'
        );
        const that = this;
        this.config = {
            type: 'line',
            data: {
                labels: this.countryDailyFigures.map((daily) => daily.date),
                datasets: [
                    {
                        label: `Confirmed Cases`,
                        fill: false,
                        borderColor: 'red',
                        backgroundColor: 'red',
                        data: this.countryDailyFigures.map(
                            (daily) => daily.confirmed
                        )
                    },
                    {
                        label: `Death Tolls`,
                        fill: false,
                        borderColor: 'black',
                        backgroundColor: 'black',
                        data: this.countryDailyFigures.map(
                            (daily) => daily.deaths
                        )
                    },
                    {
                        label: 'Recovered',
                        fill: false,
                        borderColor: 'blue',
                        backgroundColor: 'blue',
                        data: this.countryDailyFigures.map(
                            (daily) => daily.recovered
                        )
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: `COVID-19 Figures for ${this._countryName}`
                },
                animation: {
                    duration: 3000,
                    onProgress: function (animation) {
                        that.progress.value =
                            animation.currentStep / animation.numSteps;
                    },
                    onComplete: function () {
                        // eslint-disable-next-line @lwc/lwc/no-async-operation
                        window.setTimeout(function () {
                            that.progress.value = 0;
                        }, 1000);
                    }
                },
                responsive: true,
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                hover: {
                    mode: 'point',
                    intersect: true
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                callback: function (value, index, values) {
                                    return index % 3 === 1 ? value : '';
                                }
                            }
                        }
                    ]
                }
            }
        };
        this.loadChartJs();
    }
}
