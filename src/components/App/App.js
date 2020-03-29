import React, { Component, Suspense } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import CustomMessage from '../common/CustomMessage/CustomMessage';
import ErrorBoundary from '../common/ErrorBoundary/ErrorBoundary';
import ExchangeRatesContainer from '../pages/ExchangeRates/ExchangeRatesContainer';
import NavigationMenuContainer from '../common/NavigationMenu/NavigationMenuContainer';
import Spinner from '../common/Spinner/Spinner';

import { ASSUMED_BASE_CURRENCY } from '../../constants';

const ConverterContainer = React.lazy(() => import('../pages/Converter/ConverterContainer'));

class App extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchBaseCurrencyAndRates();
  }

  render() {
    const {
      isLoading, baseCurrencyError, ratesSuccess, ratesError,
    } = this.props;

    const components = (
      <Switch>
        <Route path="/" component={ExchangeRatesContainer} exact />
        <Route
          path="/converter"
          render={() => (
            <Suspense fallback={<Spinner />}>
              <ConverterContainer />
            </Suspense>
          )}
        />
        <Route render={() => <h1>The requested page can not be found</h1>} />
      </Switch>
    );

    const baseCurrencyErrorMsg = (
      <CustomMessage
        type="warning"
        header="Unable to detect your base currency"
        content={
          `The base currency is set to ${ASSUMED_BASE_CURRENCY}. 
          Feel free to change it via the dropdown menu on top of the page`
        }
      />
    );

    const ratesErrorMsg = (
      <CustomMessage
        type="error"
        header="Sorry, couldn't fetch exchange rates"
        content="We're working on that. Please, come back later"
      />
    );

    return (
      <ErrorBoundary>
        <Router>
          <NavigationMenuContainer />
          <Container className="content">
            {baseCurrencyError && baseCurrencyErrorMsg}
            {ratesError && ratesErrorMsg}
            {isLoading && <Spinner />}
            {ratesSuccess && components}
          </Container>
        </Router>
      </ErrorBoundary>
    );
  }
}

App.propTypes = {
  isLoading: PropTypes.bool,
  baseCurrencyError: PropTypes.string,
  ratesSuccess: PropTypes.bool,
  ratesError: PropTypes.string,
  fetchBaseCurrencyAndRates: PropTypes.func.isRequired,
};

export default App;
