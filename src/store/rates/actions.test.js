import moxios from 'moxios';
import { createStore, applyMiddleware } from 'redux';

import { fetchRates } from './actions';
import { middlewares, rootReducer } from '../configureStore';
import {
  baseCurr, newRates, outdatedPersistedState, relevantPersistedState,
} from '../../fixtures/mockedData';

const storeFactory = (state) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, state);
};

const extractObjProps = (obj) => (...props) => props.reduce((acc, prop) => ({ ...acc, [prop]: obj[prop] }), {});

describe('fetchRates async action creator without persisted store', () => {
  let store;

  beforeEach(() => {
    store = storeFactory();
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should set loading to true right after calling', () => {
    store.dispatch(fetchRates(baseCurr));
    const newState = store.getState();
    expect(newState.rates.loading).toBe(true);
  });

  it('should successfully fetch rates and add them to store', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: newRates,
      });
    });

    return store.dispatch(fetchRates(baseCurr))
      .then(() => {
        const expectedProps = {
          rates: newRates,
          loading: false,
          success: true,
          error: '',
        };
        const newState = store.getState();
        const newStateProps = extractObjProps(newState.rates)('rates', 'loading', 'success', 'error');
        expect(newStateProps).toEqual(expectedProps);
      });
  });

  it('should fail to fetch rates and add an error to store', () => {
    const errorMsg = 'Request failed with status code 404';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
      });
    });

    return store.dispatch(fetchRates(baseCurr))
      .then(() => {
        const expectedProps = {
          rates: {},
          loading: false,
          success: false,
          error: errorMsg,
        };
        const newState = store.getState();
        const newStateProps = extractObjProps(newState.rates)('rates', 'loading', 'success', 'error');
        expect(newStateProps).toEqual(expectedProps);
      });
  });
});

describe('fetchRates async action creator with relevant rates in persisted store', () => {
  let store;
  let hasAPIbeenCalled = false;

  beforeEach(() => {
    store = storeFactory(relevantPersistedState);
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should not fetch rates again', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: newRates,
      });
    });

    return store.dispatch(fetchRates(baseCurr))
      .then((res) => {
        if (res) hasAPIbeenCalled = true;
        expect(hasAPIbeenCalled).toBe(false);
      });
  });
});


describe('fetchRates async action creator with outdated rates in persisted store', () => {
  let store;
  let hasAPIbeenCalled = false;

  beforeEach(() => {
    store = storeFactory(outdatedPersistedState);
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should fetch fresh rates', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: newRates,
      });
    });

    return store.dispatch(fetchRates(baseCurr))
      .then((res) => {
        if (res) hasAPIbeenCalled = true;
        expect(hasAPIbeenCalled).toBe(true);
      });
  });
});
