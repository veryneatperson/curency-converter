import { fetchBaseCurrency } from '../user/actions';
import { fetchRates } from '../rates/actions';
import { getBaseCurrency } from '../user/selectors';

const fetchBaseCurrencyAndRates = () => (dispatch, getState) => dispatch(fetchBaseCurrency())
  .then(() => dispatch(fetchRates(getBaseCurrency(getState()))));

export default fetchBaseCurrencyAndRates;
