import ExchangeRates from './ExchangeRates';
import { newRates as rates } from '../../../fixtures/mockedData';

const defaultProps = {
  baseCurrency: 'RUB',
  favorites: [],
  fetchedForCurrency: 'RUB',
  rates,
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<ExchangeRates {...setupProps} />);
};

describe('<ExchangeRates>', () => {
  let wrapper;
  let addToFavoritesMock;
  let removeFromFavoritesMock;

  beforeEach(() => {
    addToFavoritesMock = jest.fn();
    removeFromFavoritesMock = jest.fn();
    wrapper = setup({
      addToFavorites: addToFavoritesMock,
      removeFromFavorites: removeFromFavoritesMock,
    });
  });

  it('should initialize searchTerm as an empty string', () => {
    expect(wrapper.state('searchTerm')).toBe('');
  });

  it('should render 1 <SubTable> with 0 items in props.favorites', () => {
    expect(wrapper.find('SubTable').length).toBe(1);
  });

  it('should render 2 <SubTable> with one item in props.favorites', () => {
    wrapper.setProps({ favorites: ['cad'] });
    expect(wrapper.find('SubTable').length).toBe(2);
  });

  it('should change searchTerm on input change', () => {
    const changeEventConfig = {
      target: { value: 'a' },
    };
    wrapper.find('Input').simulate('change', changeEventConfig);
    expect(wrapper.state('searchTerm')).toBe(changeEventConfig.target.value);
  });

  describe('by calling getRate', () => {
    it('should return correct rate when baseCurrency === fetchedForCurrency', () => {
      const code = 'usd';
      const expectedResult = rates[code].inverseRate;
      expect(wrapper.instance().getRate(code)).toBe(expectedResult);
    });

    it('should return correct rate when baseCurrency !== fetchedForCurrency and code === fetchedForCurrency', () => {
      const code = 'rub';
      const baseCurrency = 'cad';
      wrapper.setProps({ baseCurrency });
      const expectedResult = rates[baseCurrency].rate;
      expect(wrapper.instance().getRate(code)).toBe(expectedResult);
    });

    it('should return correct rate when baseCurrency !== fetchedForCurrency and code !== fetchedForCurrency', () => {
      const code = 'usd';
      const baseCurrency = 'cad';
      wrapper.setProps({ baseCurrency });
      const expectedResult = rates[baseCurrency].rate * rates[code].inverseRate;
      expect(wrapper.instance().getRate(code)).toBe(expectedResult);
    });
  });
});
