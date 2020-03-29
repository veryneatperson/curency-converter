import { connect } from 'react-redux';

import NavigationMenu from './NavigationMenu';
import { GET_BASE_CURRENCY_SUCCESS } from '../../../store/user/actions';
import { getBaseCurrency } from '../../../store/user/selectors';

const mapStateToProps = (state) => ({
  baseCurrency: getBaseCurrency(state),
});

const mapDispatchToProps = (dispatch) => ({
  setBaseCurrency: (curr) => dispatch({ type: GET_BASE_CURRENCY_SUCCESS, payload: curr }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenu);
