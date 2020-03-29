import { DropdownMenu } from './DropdownMenu';

const defaultProps = {
  placeholder: 'Click here...',
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<DropdownMenu {...setupProps} />);
};

describe('<DropdownMenu>', () => {
  describe('without passed value and placeholder', () => {
    let wrapper;
    let handleChangeMock;

    beforeEach(() => {
      handleChangeMock = jest.fn();
      wrapper = setup({ handleChange: handleChangeMock });
    });

    it('should render default placeholder text', () => {
      expect(wrapper.find('Dropdown').props().placeholder).toBe(defaultProps.placeholder);
    });

    it('should render default empty string value', () => {
      expect(wrapper.find('Dropdown').props().value).toBe('');
    });

    it('should call onChange event handler with correct args', () => {
      const changeEventConfig = {
        target: { value: 'USD' },
      };
      wrapper.simulate('change', changeEventConfig);
      expect(handleChangeMock).toHaveBeenCalledWith(changeEventConfig);
    });
  });

  describe('with passed value and placeholder', () => {
    let wrapper;
    let handleChangeMock;

    const props = {
      value: 'RUB',
      placeholder: 'Currency to convert FROM',
    };

    beforeEach(() => {
      handleChangeMock = jest.fn();
      wrapper = setup({ ...props, handleChange: handleChangeMock });
    });

    it('should render placeholder text', () => {
      expect(wrapper.find('Dropdown').props().placeholder).toBe(props.placeholder);
    });

    it('should render value', () => {
      expect(wrapper.find('Dropdown').props().value).toBe(props.value);
    });
  });
});
