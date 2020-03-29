import SubTable from './SubTable';

const defaultProps = {
  name: 'Currencies',
  iconName: 'star',
  currencies: [
    {
      code: 'AED',
      country: 'AE',
      name: 'U.A.E Dirham',
    },
    {
      code: 'ALL',
      country: 'AL',
      name: 'Albanian lek',
    },
  ],
  getRate: jest.fn(() => 1.234567),
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<SubTable {...setupProps} />);
};

describe('<SubTable>', () => {
  let wrapper;
  let handleClickMock;

  beforeEach(() => {
    handleClickMock = jest.fn();
    wrapper = setup({ handleClick: handleClickMock });
  });

  it('should render table name', () => {
    expect(wrapper.contains(defaultProps.name)).toBe(true);
  });

  it('should render correct amount of <Memo(CurrencyItem)>', () => {
    expect(wrapper.find('Memo(CurrencyItem)').length).toBe(defaultProps.currencies.length);
  });

  it('should render <Memo(CurrencyItem)> with correct props', () => {
    expect(wrapper.find('Memo(CurrencyItem)').at(0).props()).toEqual({
      ...defaultProps.currencies[0],
      handleClick: handleClickMock,
      rate: defaultProps.getRate(),
      iconName: defaultProps.iconName,
    });
  });
});
