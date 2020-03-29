import { CurrencyItem } from './CurrencyItem';

const defaultProps = {
  code: 'AUD',
  country: 'au',
  name: 'Australian Dollar',
  rate: 1.11111,
  iconName: 'star',
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<CurrencyItem {...setupProps} />);
};

describe('<CurrencyItem>', () => {
  let wrapper;
  let handleClickMock;

  beforeEach(() => {
    handleClickMock = jest.fn();
    wrapper = setup({ handleClick: handleClickMock });
  });

  it('should render correct <Flag>', () => {
    expect(wrapper.find('Flag').props().name).toBe(defaultProps.country);
  });

  it('should render currency code', () => {
    expect(wrapper.contains(defaultProps.code)).toBe(true);
  });

  it('should render currency name', () => {
    expect(wrapper.contains(defaultProps.name)).toBe(true);
  });

  it('should render currency rate', () => {
    expect(wrapper.contains(defaultProps.rate.toString())).toBe(true);
  });

  describe('renders <Icon> that', () => {
    it('should render correct name', () => {
      expect(wrapper.find('Icon').props().name).toBe(defaultProps.iconName);
    });

    it('should call onClick eventhandler with correct args', () => {
      wrapper.find('Icon').simulate('click');
      expect(handleClickMock).toHaveBeenCalledWith(defaultProps.code.toLowerCase());
    });

    it('should be yellow if iconName == `star`', () => {
      expect(wrapper.find('Icon').props().color).toEqual('yellow');
    });

    it('should be red if iconName !== `star`', () => {
      wrapper.setProps({ iconName: 'delete' });
      expect(wrapper.find('Icon').props().color).toEqual('red');
    });
  });
});
