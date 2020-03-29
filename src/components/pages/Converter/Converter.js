import React, { Component } from 'react';
import {
  Button, Header, Icon, Input, Grid, Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';
import CURRENCIES_DICTIONARY from '../../../data/currencies-dictionary.json';

const getFullCurrencyName = (curr) => CURRENCIES_DICTIONARY[curr];

export class Converter extends Component {
  state = {
    result: null,
    fromCurrency: '',
    toCurrency: '',
    amount: 1,
    amountInputError: '',
  }

  isAmountValid = (val) => !Number.isNaN(Number(val)) && Number(val) > 0;

  areAllFieldsValid = ({
    fromCurrency, toCurrency, amountInputError,
  }) => fromCurrency && toCurrency && !amountInputError;

  handleAmountChange = ({ target: { value: amount } }) => (this.isAmountValid(amount)
    ? this.setState({ amount, amountInputError: '' })
    : this.setState({ amount, amountInputError: 'Only positive numbers are valid inputs' })
  );

  handleCurrencyChange = (dropdownType) => (e, { value }) => this.setState({ [dropdownType]: value })

  handleConvert = () => {
    let result;

    const { amount, fromCurrency, toCurrency } = this.state;
    const { fetchedForCurrency, rates } = this.props;

    const [fromC, toC, fetchedForC] = [fromCurrency, toCurrency, fetchedForCurrency]
      .map((el) => el.toLowerCase());

    if (fromC === fetchedForC) {
      result = amount * rates[toC].rate;
    } else if (toC === fetchedForC) {
      result = amount * rates[fromC].inverseRate;
    } else {
      const inFetchedForC = amount * rates[fromC].inverseRate;
      result = inFetchedForC * rates[toC].rate;
    }

    this.setState({ result });
  }

  handleCurrenciesSwap = () => {
    const { fromCurrency, toCurrency } = this.state;
    this.setState(
      { fromCurrency: toCurrency, toCurrency: fromCurrency },
      () => {
        if (fromCurrency && toCurrency) this.handleConvert();
      },
    );
  }

  render() {
    const {
      amount, fromCurrency, result, toCurrency, amountInputError,
    } = this.state;

    return (
      <Grid>
        <Grid.Row centered>
          <Header as="h1">Currency Converter</Header>
        </Grid.Row>
        <Grid.Row centered>

          <Grid.Column width="twelve">
            <Grid>
              <Grid.Row>
                <Grid.Column width="seven" floated="left" stretched>
                  <DropdownMenu
                    value={fromCurrency}
                    handleChange={this.handleCurrencyChange('fromCurrency')}
                    placeholder="Select the currency to convert FROM"
                  />
                </Grid.Column>
                <Grid.Column width="two" textAlign="center">
                  <Icon
                    name="exchange"
                    size="big"
                    onClick={this.handleCurrenciesSwap}
                    disabled={!fromCurrency && !toCurrency}
                  />
                </Grid.Column>
                <Grid.Column width="seven" floated="right" stretched>
                  <DropdownMenu
                    value={toCurrency}
                    handleChange={this.handleCurrencyChange('toCurrency')}
                    placeholder="Select the currency to convert TO"
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width="eight">
                  <Input
                    error={!!amountInputError}
                    size="big"
                    placeholder="Enter amount..."
                    onChange={this.handleAmountChange}
                    value={amount}
                    fluid
                  />
                </Grid.Column>
                <Grid.Column width="eight" stretched>
                  <Button
                    size="big"
                    color="green"
                    fluid
                    disabled={!this.areAllFieldsValid({ fromCurrency, toCurrency, amountInputError })}
                    onClick={this.handleConvert}
                  >
                    Convert
                  </Button>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row centered>
                <Grid.Column>
                  {amountInputError
                    && (
                      <Message
                        error
                        size="big"
                        content={amountInputError}
                      />
                    )}
                  {result
                    && (
                      <Message
                        success
                        size="big"
                        content={
                          `${amount}  
                          ${getFullCurrencyName(fromCurrency)}(s)  equal(s)  ${result.toFixed(3)}  
                          ${getFullCurrencyName(toCurrency)}(s)`
                        }
                      />
                    )}
                </Grid.Column>
              </Grid.Row>

            </Grid>
          </Grid.Column>

          <Grid.Column width="four" textAlign="center">
            <Message
              info
              header="Key Features"
              list={[
                'Fill in all the fields and click "Convert"',
                'To swap the currencies - click on "Exchange" icon',
                'Rates are updated daily about 00:00 GMT',
              ]}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

Converter.propTypes = {
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

export default Converter;
