import { baseRatesReducer } from './reducer';
import { GET_RATES_SUCCESS } from './actions';

const initialState = {
  rates: {},
  fetchedForCurrency: '',
  timestamp: null,
};

describe('baseRatesReducer', () => {
  it('should return default initial state when no action is passed', () => {
    const newState = baseRatesReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it(`should return updated state upon receiving a ${GET_RATES_SUCCESS} action`, () => {
    const actionObj = {
      type: GET_RATES_SUCCESS,
      payload: {
        rates: { USD: 1, EUR: 2 },
        fetchedForCurrency: 'RUB',
        timestamp: 11111,
      },
    };
    const newState = baseRatesReducer(undefined, actionObj);
    expect(newState).toEqual(actionObj.payload);
  });
});
