import App from './App';

const defaultProps = {
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<App {...setupProps} />);
};

describe('<App>', () => {
  describe('on init', () => {
    let wrapper;
    let fetchBaseCurrencyAndRatesMock;

    beforeEach(() => {
      fetchBaseCurrencyAndRatesMock = jest.fn();
      wrapper = setup({
        fetchBaseCurrencyAndRates: fetchBaseCurrencyAndRatesMock,
      });
    });

    it('should not render any <CustomMessage> on init ', () => {
      expect(wrapper.find('CustomMessage').length).toBe(0);
    });

    it('should not render <Spinner> on init', () => {
      expect(wrapper.find('Spinner').length).toBe(0);
    });

    it('should call fetchBaseCurrencyAndRatesMock after initial mount', () => {
      expect(fetchBaseCurrencyAndRatesMock).toHaveBeenCalled();
    });
  });

  describe('with given props', () => {
    let wrapper;
    let fetchBaseCurrencyAndRatesMock;

    beforeEach(() => {
      fetchBaseCurrencyAndRatesMock = jest.fn();
      wrapper = setup({
        fetchBaseCurrencyAndRates: fetchBaseCurrencyAndRatesMock,
      });
    });

    it('should render <CustomMessage> for baseCurrencyError', () => {
      const baseCurrencyError = 'something is wrong';
      const expectedType = 'warning';
      wrapper.setProps({ baseCurrencyError });
      expect(wrapper.findWhere((n) => n.name() === 'CustomMessage' && n.props().type === expectedType).length).toBe(1);
    });

    it('should render <CustomMessage> for baseCurrencyError', () => {
      const ratesError = 'something is wrong';
      const expectedType = 'error';
      wrapper.setProps({ ratesError });
      expect(wrapper.findWhere((n) => n.name() === 'CustomMessage' && n.props().type === expectedType).length).toBe(1);
    });

    it('should render <Spinner> while loading', () => {
      const isLoading = true;
      wrapper.setProps({ isLoading });
      expect(wrapper.find('Spinner').length).toBe(1);
    });

    it('should render Switch-block with components when ratesSuccess === true', () => {
      const ratesSuccess = true;
      wrapper.setProps({ ratesSuccess });
      expect(wrapper.find('Switch').length).toBe(1);
    });
  });
});
