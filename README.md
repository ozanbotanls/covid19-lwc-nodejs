# covid19-lwc-nodejs

This is a Node.js app that leverages Salesforce's Lightning Web Components (LWC) to show world-wide COVID-19 figures.

## live site runs on Heroku: https://covid-figures--nodejs-lwc.herokuapp.com/

[Chart.js]: https://www.chartjs.org/
[countryDetail]: https://github.com/ozanbotanls/covid19-lwc-nodejs/blob/master/src/modules/my/countryDetail/countryDetail.js#L19
In [countryDetail] component, [Chart.js] is used to visualize how the virus has spread for each country over time.

[SLDS module]: https://github.com/ozanbotanls/covid19-lwc-nodejs/blob/master/package.json#L8
##### Styles are not mature, it should utilize SLDS for a native LWC look and feel. Also responsiveness for mobile version could be taken into acccount (package already includes [SLDS module])

#### p.s. Data used relies on Johns Hopkins University Center for Systems Science and Engineering and this app uses the following: https://github.com/pomber/covid19#user-content-adding-your-project-to-the-list
