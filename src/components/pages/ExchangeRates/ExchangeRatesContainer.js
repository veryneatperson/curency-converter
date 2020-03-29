import { connect } from 'react-redux';

import { addToFavorites, removeFromFavorites } from '../../../store/user/actions';
import { getBaseCurrency, getFavorites } from '../../../store/user/selectors';
import { getRates, getFetchedForCurrency } from '../../../store/rates/selectors';
import ExchangeRates from './ExchangeRates';

const mapStateToProps = (state) => ({
  baseCurrency: getBaseCurrency(state),
  favorites: getFavorites(state),
  fetchedForCurrency: getFetchedForCurrency(state),
  rates: getRates(state),
});

const mapDispatchToProps = (dispatch) => ({
  addToFavorites: (currencyCode) => dispatch(addToFavorites(currencyCode)),
  removeFromFavorites: (currencyCode) => dispatch(removeFromFavorites(currencyCode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRates);
