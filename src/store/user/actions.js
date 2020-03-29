import Axios from 'axios';

export const GET_BASE_CURRENCY_REQUEST = 'GET_BASE_CURRENCY_REQUEST';
export const GET_BASE_CURRENCY_SUCCESS = 'GET_BASE_CURRENCY_SUCCESS';
export const GET_BASE_CURRENCY_FAILURE = 'GET_BASE_CURRENCY_FAILURE';

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

export const fetchBaseCurrency = () => ({
  types: [GET_BASE_CURRENCY_REQUEST, GET_BASE_CURRENCY_SUCCESS, GET_BASE_CURRENCY_FAILURE],
  shouldCallAPI: (state) => !state.user.baseCurrency,
  callAPI: () => Axios.get(process.env.REACT_APP_GEOPLUGIN_API_URL),
  constructActionPayload: (res) => res.data.geoplugin_currencyCode,
});

export const addToFavorites = (currencyCode) => ({
  type: ADD_TO_FAVORITES,
  payload: currencyCode,
});

export const removeFromFavorites = (currencyCode) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: currencyCode,
});
