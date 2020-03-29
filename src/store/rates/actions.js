import Axios from 'axios';

import areRatesRelevant from '../../helpers/areRatesRelevant';

export const GET_RATES_REQUEST = 'GET_RATES_REQUEST';
export const GET_RATES_SUCCESS = 'GET_RATES_SUCCESS';
export const GET_RATES_FAILURE = 'GET_RATES_FAILURE';

export const fetchRates = (curr) => ({
  types: [GET_RATES_REQUEST, GET_RATES_SUCCESS, GET_RATES_FAILURE],
  shouldCallAPI: ({ rates: { timestamp } }) => (timestamp ? !areRatesRelevant(timestamp) : true),
  callAPI: () => Axios.get(`${process.env.REACT_APP_FLOATRATES_API_BASE_URL}/${curr}.json`),
  constructActionPayload: (res) => {
    const timestamp = res.data.usd
      ? Date.parse(res.data.usd.date)
      : Date.parse(res.data.eur.date);
    return { fetchedForCurrency: curr, rates: res.data, timestamp };
  },
});
