import { connect } from 'react-redux';

import App from './App';
import {
  getRatesError,
  getRatesSuccess,
} from '../../store/rates/selectors';
import { getBaseCurrencyError } from '../../store/user/selectors';
import getIsLoading from '../../store/combined/selectors';
import fetchBaseCurrencyAndRates from '../../store/combined/actions';

const mapStateToProps = (state) => ({
  isLoading: getIsLoading(state),
  baseCurrencyError: getBaseCurrencyError(state),
  ratesSuccess: getRatesSuccess(state),
  ratesError: getRatesError(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchBaseCurrencyAndRates: () => dispatch(fetchBaseCurrencyAndRates()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
