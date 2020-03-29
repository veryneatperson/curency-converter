import { baseUserReducer } from './reducer';
import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  GET_BASE_CURRENCY_SUCCESS,
  GET_BASE_CURRENCY_FAILURE,
} from './actions';
import { ASSUMED_BASE_CURRENCY } from '../../constants';

const initialState = {
  baseCurrency: '',
  favorites: [],
};

describe('baseUserReducer', () => {
  it('should return default initial state when no action is passed', () => {
    const newState = baseUserReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  it(`should return updated state upon receiving an ${ADD_TO_FAVORITES} action`, () => {
    const actionObj = {
      type: ADD_TO_FAVORITES,
      payload: 'USD',
    };
    const newState = baseUserReducer(undefined, actionObj);
    expect(newState).toEqual({ ...initialState, favorites: [actionObj.payload] });
  });

  it(`should return updated state upon receiving an ${REMOVE_FROM_FAVORITES} action`, () => {
    const curr = 'USD';
    const actionObj = {
      type: REMOVE_FROM_FAVORITES,
      payload: curr,
    };
    const prevState = { ...initialState, favorites: [curr] };
    const newState = baseUserReducer(prevState, actionObj);
    expect(newState).toEqual({ ...initialState, favorites: prevState.favorites.filter((el) => el !== curr) });
  });

  it(`should return updated state upon receiving an ${GET_BASE_CURRENCY_SUCCESS} action`, () => {
    const curr = 'RUB';
    const actionObj = {
      type: GET_BASE_CURRENCY_SUCCESS,
      payload: curr,
    };
    const newState = baseUserReducer(undefined, actionObj);
    expect(newState).toEqual({ ...initialState, baseCurrency: curr });
  });

  it(`should return updated state upon receiving an ${GET_BASE_CURRENCY_FAILURE} action`, () => {
    const actionObj = {
      type: GET_BASE_CURRENCY_FAILURE,
    };
    const newState = baseUserReducer(undefined, actionObj);
    expect(newState).toEqual({ ...initialState, baseCurrency: ASSUMED_BASE_CURRENCY });
  });
});
