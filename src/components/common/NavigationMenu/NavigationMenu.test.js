import { NavigationMenu } from './NavigationMenu';

const defaultProps = {
  baseCurrency: 'usd',
  location: {
    pathname: '/',
  },
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<NavigationMenu {...setupProps} />);
};

describe('<NavigationMenu>', () => {
  let wrapper;
  let setBaseCurrencyMock;

  beforeEach(() => {
    setBaseCurrencyMock = jest.fn();
    wrapper = setup({ setBaseCurrency: setBaseCurrencyMock });
  });

  it('should render 1 active link', () => {
    expect(wrapper.find({ className: 'link active' }).length).toBe(1);
  });

  it('should render 1 non-active link', () => {
    expect(wrapper.find({ className: 'link' }).length).toBe(1);
  });

  it('should render 2 non-active links for not found page', () => {
    wrapper.setProps({
      location: {
        pathname: '/notfound',
      },
    });
    expect(wrapper.find({ className: 'link' }).length).toBe(2);
  });

  it('should call setBaseCurrency with correct args in child <DropdownMenu>', () => {
    const value = 'AUD';
    wrapper.find('Memo(DropdownMenu)').prop('handleChange')({}, { value });
    expect(setBaseCurrencyMock).toHaveBeenCalledWith(value);
  });
});
