import { countryCodes } from '../../../../countryCodes';
export const getCountryCodeByName = (countryName) => {
    const countryCode = Object.keys(countryCodes).filter(
        (key) => countryCodes[key] === countryName
    );
    return countryCode;
};
