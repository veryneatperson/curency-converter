import {
  GET_BASE_CURRENCY_REQUEST,
  GET_BASE_CURRENCY_SUCCESS,
  GET_BASE_CURRENCY_FAILURE,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from './actions';
import withLoadable from '../hor/withLoadable';
import { ASSUMED_BASE_CURRENCY } from '../../constants';

const initialState = {
  baseCurrency: '',
  favorites: [],
};

export const baseUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter((curr) => curr !== action.payload),
      };
    case GET_BASE_CURRENCY_SUCCESS:
      return {
        ...state,
        baseCurrency: action.payload,
      };
    case GET_BASE_CURRENCY_FAILURE:
      return {
        ...state,
        baseCurrency: ASSUMED_BASE_CURRENCY,
      };
    default:
      return state;
  }
};

export default withLoadable({
  loadingActionType: GET_BASE_CURRENCY_REQUEST,
  successActionType: GET_BASE_CURRENCY_SUCCESS,
  errorActionType: GET_BASE_CURRENCY_FAILURE,
})(baseUserReducer);
