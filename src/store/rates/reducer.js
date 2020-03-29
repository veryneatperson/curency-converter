import {
  GET_RATES_REQUEST,
  GET_RATES_SUCCESS,
  GET_RATES_FAILURE,
} from './actions';
import withLoadable from '../hor/withLoadable';

export const initialState = {
  rates: {},
  fetchedForCurrency: '',
  timestamp: null,
};

export const baseRatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RATES_SUCCESS: {
      const { rates, fetchedForCurrency, timestamp } = action.payload;
      return {
        ...state,
        rates,
        timestamp,
        fetchedForCurrency,
      }; }
    default:
      return state;
  }
};

export default withLoadable({
  loadingActionType: GET_RATES_REQUEST,
  successActionType: GET_RATES_SUCCESS,
  errorActionType: GET_RATES_FAILURE,
})(baseRatesReducer);
