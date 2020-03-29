import React, { Component } from 'react';
import {
  Grid, Header, Input, Message, Table,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import splitArray from '../../../helpers/splitArray';
import SubTable from './SubTable/SubTable';
import CURRENCIES_ARRAY from '../../../data/currencies-array.json';

class ExchangeRates extends Component {
  state = {
    searchTerm: '',
  }

  handleSearchTermChange = (e) => this.setState({ searchTerm: e.target.value })

  getRate = (code) => {
    let result;

    const { baseCurrency, fetchedForCurrency, rates } = this.props;
    const [baseC, fetchedForC] = [baseCurrency, fetchedForCurrency]
      .map((el) => el.toLowerCase());

    if (baseC === fetchedForC) {
      result = rates[code].inverseRate;
    } else if (code === fetchedForC) {
      result = rates[baseC].rate;
    } else {
      result = rates[baseC].rate * rates[code].inverseRate;
    }
    return result;
  }

  render() {
    let filteredCurrencies;

    const { searchTerm } = this.state;
    const {
      baseCurrency, favorites, addToFavorites, removeFromFavorites,
    } = this.props;

    if (searchTerm.trim()) {
      filteredCurrencies = CURRENCIES_ARRAY
        .filter((curr) => curr.code.toLowerCase() !== baseCurrency.toLowerCase())
        .filter((curr) => curr.code.toLowerCase().includes(searchTerm.trim().toLowerCase())
          || curr.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));
    } else {
      filteredCurrencies = CURRENCIES_ARRAY
        .filter((curr) => curr.code !== baseCurrency);
    }

    const [favoriteCurrencies, otherCurrencies] = splitArray(
      filteredCurrencies,
      (el) => favorites.includes(el.code.toLowerCase()),
    );

    return (
      <Grid>
        <Grid.Row centered>
          <Header as="h1">Currency Exchange Rates</Header>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column width="twelve">
            <Input value={searchTerm} fluid placeholder="Type for search..." onChange={this.handleSearchTermChange} />
            {
              !filteredCurrencies.length
                ? (
                  <Message
                    warning
                    header="No matches found"
                    content="Please, try another search term"
                  />
                )
                : (
                  <Table celled>
                    {
                      favoriteCurrencies.length
                        ? (
                          <SubTable
                            name="Your Favorite Currencies"
                            currencies={favoriteCurrencies}
                            iconName="delete"
                            handleClick={removeFromFavorites}
                            getRate={this.getRate}
                          />
                        ) : null
                    }
                    {
                      otherCurrencies.length
                        ? (
                          <SubTable
                            name="Currencies"
                            currencies={otherCurrencies}
                            iconName="star"
                            handleClick={addToFavorites}
                            getRate={this.getRate}
                          />
                        ) : null
                    }
                  </Table>
                )
            }

          </Grid.Column>
          <Grid.Column width="four" textAlign="center">
            <Message
              info
              header="Key Features"
              list={[
                'Rates are shown in relation to the User\'s base currency',
                'The base currency can be changed via the dropdown on top of the page',
                'Click on \'Star\' icon to mark the curenncy as favorite',
                'Click on \'Delete\' icon to remove the currency from favorites',
                'Rates are updated daily around 00:00 GMT',
              ]}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

ExchangeRates.propTypes = {
  addToFavorites: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  baseCurrency: PropTypes.string.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchedForCurrency: PropTypes.string.isRequired,
  rates: PropTypes.objectOf(PropTypes.shape({
    alphaCode: PropTypes.string,
    code: PropTypes.string.isRequired,
    date: PropTypes.string,
    inverseRate: PropTypes.number.isRequired,
    name: PropTypes.string,
    numericCode: PropTypes.string,
    rate: PropTypes.number.isRequired,
  })).isRequired,
};

export default ExchangeRates;
