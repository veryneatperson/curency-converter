import CustomMessage from './CustomMessage';

const defaultProps = {
  type: 'error',
  header: 'Some error occured',
  content: 'We\'re working on fixing that',
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<CustomMessage {...setupProps} />);
};

describe('<CustomMessage>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('should correctly initialize state', () => {
    expect(wrapper.state('hidden')).toBe(false);
  });

  it('should render <Message> with correct type', () => {
    expect(wrapper.find('Message').props()[defaultProps.type]).toBe(true);
  });

  it('should render <Message> with correct header', () => {
    expect(wrapper.contains(defaultProps.header)).toBe(true);
  });

  it('should render <Message> with correct content', () => {
    expect(wrapper.contains(defaultProps.content)).toBe(true);
  });

  it('should change state in respond to button click', () => {
    wrapper.find('Message').simulate('dismiss');
    expect(wrapper.state('hidden')).toBe(true);
  });
});
