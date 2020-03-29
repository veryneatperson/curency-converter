import moxios from 'moxios';
import { createStore, applyMiddleware } from 'redux';

import { fetchBaseCurrency } from './actions';
import { middlewares, rootReducer } from '../configureStore';
import { ASSUMED_BASE_CURRENCY } from '../../constants';

const storeFactory = () => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer);
};

const extractObjProps = (obj) => (...props) => props.reduce((acc, prop) => ({ ...acc, [prop]: obj[prop] }), {});

describe('fetchBaseCurrency async action creator', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should successfully fetch base currency and add it to store', () => {
    const store = storeFactory();
    const curr = 'RUB';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          geoplugin_currencyCode: curr,
        },
      });
    });

    return store.dispatch(fetchBaseCurrency())
      .then(() => {
        const exptectedProps = {
          baseCurrency: curr,
          loading: false,
          success: true,
          error: '',
        };
        const newState = store.getState();
        const newStateProps = extractObjProps(newState.user)('baseCurrency', 'loading', 'success', 'error');
        expect(newStateProps).toEqual(exptectedProps);
      });
  });

  it('should fail to fetch base currency and add error to store and set base currency as default', () => {
    const store = storeFactory();
    const errorMsg = 'Request failed with status code 404';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
      });
    });

    return store.dispatch(fetchBaseCurrency())
      .then(() => {
        const exptectedProps = {
          baseCurrency: ASSUMED_BASE_CURRENCY,
          loading: false,
          success: false,
          error: errorMsg,
        };
        const newState = store.getState();
        const newStateProps = extractObjProps(newState.user)('baseCurrency', 'loading', 'success', 'error');
        expect(newStateProps).toEqual(exptectedProps);
      });
  });

  it('should set loading to true after calling', () => {
    const store = storeFactory();
    store.dispatch(fetchBaseCurrency());
    const newState = store.getState();
    expect(newState.user.loading).toBe(true);
  });
});
