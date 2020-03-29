import { Converter } from './Converter';
import { newRates as rates } from '../../../fixtures/mockedData';

const defaultProps = {
  fetchedForCurrency: 'RUB',
  rates,
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Converter {...setupProps} />);
};

describe('<Converter>', () => {
  describe('with default state', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup();
    });

    it('should initialize correctly', () => {
      const expectedState = {
        result: null,
        fromCurrency: '',
        toCurrency: '',
        amount: 1,
        amountInputError: '',
      };
      expect(wrapper.state()).toEqual(expectedState);
    });

    it('should render fromCurrency <Memo(DropdownMenu)> with empty initial value', () => {
      const expectedValue = '';
      expect(wrapper.find('Memo(DropdownMenu)').at(0).props().value).toBe(expectedValue);
    });

    it('should render toCurrency <Memo(DropdownMenu)> with empty initial value', () => {
      const expectedValue = '';
      expect(wrapper.find('Memo(DropdownMenu)').at(1).props().value).toBe(expectedValue);
    });

    it('should render disabled <Icon>', () => {
      expect(wrapper.find('Icon').props().disabled).toBe(true);
    });

    it('should render non-error <Input>', () => {
      expect(wrapper.find('Input').props().error).toBe(false);
    });

    it('should render <Input> with empty initial value', () => {
      const expectedValue = 1;
      expect(wrapper.find('Input').props().value).toBe(expectedValue);
    });

    it('should render disabled <Button>', () => {
      expect(wrapper.find('Button').props().disabled).toBe(true);
    });

    it('should not render error <Message>', () => {
      expect(wrapper.findWhere((n) => n.name() === 'Message' && n.props().error === true).length).toBe(0);
    });

    it('should not render success <Message>', () => {
      expect(wrapper.findWhere((n) => n.name() === 'Message' && n.props().success === true).length).toBe(0);
    });
  });


  describe('in response to user interaction', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });

    it('should handle fromCurrency change', () => {
      const value = 'AUD';
      wrapper.find('Memo(DropdownMenu)').at(0).prop('handleChange')({}, { value });
      expect(wrapper.state().fromCurrency).toEqual(value);
    });

    it('should handle toCurrency change', () => {
      const value = 'CAD';
      wrapper.find('Memo(DropdownMenu)').at(1).prop('handleChange')({}, { value });
      expect(wrapper.state().toCurrency).toEqual(value);
    });

    it('should handle valid input amount change', () => {
      const value = '5';
      const changeEventConfig = {
        target: { value },
      };
      wrapper.find('Input').simulate('change', changeEventConfig);
      expect(wrapper.state().amount).toBe(value);
      expect(wrapper.state().amountInputError).toBe('');
    });

    it('should handle invalid input amount change', () => {
      const value = 'not valid';
      const errorMsg = 'Only positive numbers are valid inputs';
      const changeEventConfig = {
        target: { value },
      };
      wrapper.find('Input').simulate('change', changeEventConfig);
      expect(wrapper.state().amount).toBe(value);
      expect(wrapper.state().amountInputError).toBe(errorMsg);
    });

    it('should render enabled <Icon> when fromCurrency or toCurrency is not empty', () => {
      const fromCurrency = 'AUD';
      wrapper.setState({ fromCurrency });
      expect(wrapper.find('Icon').props().disabled).toBe(false);
    });

    it('should render enabled <Button> when all fields are valid', () => {
      const fromCurrency = 'AUD';
      const toCurrency = 'CAD';
      const amount = 10;
      wrapper.setState({ fromCurrency, toCurrency, amount });
      expect(wrapper.find('Button').props().disabled).toBe(false);
    });

    it('should swap fromCurrency and toCurrency when they are not empty', () => {
      const oldFromCurrency = 'EUR';
      const oldToCurrency = 'CAD';
      wrapper.setState({ fromCurrency: oldFromCurrency, toCurrency: oldToCurrency });
      wrapper.find('Icon').simulate('click');
      expect(wrapper.state().fromCurrency).toBe(oldToCurrency);
      expect(wrapper.state().toCurrency).toBe(oldFromCurrency);
    });

    it('should render error <Input> when input amount is invalid', () => {
      const amountInputError = 'Smth went wrong';
      wrapper.setState({ amountInputError });
      expect(wrapper.find('Input').props().error).toBe(true);
    });

    it('should render error <Message> when amountInputError is not empty', () => {
      const amountInputError = 'Smth went wrong';
      wrapper.setState({ amountInputError });
      expect(wrapper.findWhere((n) => n.name() === 'Message' && n.props().error === true).length).toBe(1);
    });

    it('should render success <Message> when result is not empty', () => {
      const result = 123;
      wrapper.setState({ result });
      expect(wrapper.findWhere((n) => n.name() === 'Message' && n.props().success === true).length).toBe(1);
    });
  });

  describe('should perform currency conversion', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });

    it('when fromCurrency === fetchedForCurrency', () => {
      const fromCurrency = 'RUB';
      const toCurrency = 'USD';
      const amount = 10;
      const expectedResult = amount * rates[toCurrency.toLowerCase()].rate;
      wrapper.setState({ fromCurrency, toCurrency, amount });
      wrapper.find('Button').simulate('click');
      expect(wrapper.state().result).toBe(expectedResult);
    });

    it('when toCurrency === fetchedForCurrency', () => {
      const fromCurrency = 'USD';
      const toCurrency = 'RUB';
      const amount = 10;
      const expectedResult = amount * rates[fromCurrency.toLowerCase()].inverseRate;
      wrapper.setState({ fromCurrency, toCurrency, amount });
      wrapper.find('Button').simulate('click');
      expect(wrapper.state().result).toBe(expectedResult);
    });

    it('for other currencies', () => {
      const fromCurrency = 'USD';
      const toCurrency = 'CAD';
      const amount = 10;
      const expectedResult = (
        amount * rates[fromCurrency.toLowerCase()].inverseRate * rates[toCurrency.toLowerCase()].rate
      );
      wrapper.setState({ fromCurrency, toCurrency, amount });
      wrapper.find('Button').simulate('click');
      expect(wrapper.state().result).toBe(expectedResult);
    });
  });
});
