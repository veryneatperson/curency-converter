import { connect } from 'react-redux';

import Converter from './Converter';
import { getFetchedForCurrency, getRates } from '../../../store/rates/selectors';

const mapStateToProps = (state) => ({
  fetchedForCurrency: getFetchedForCurrency(state),
  rates: getRates(state),
});

export default connect(mapStateToProps)(Converter);
