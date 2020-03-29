import {
  applyMiddleware, createStore, combineReducers, compose,
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import ratesReducer from './rates/reducer';
import userReducer from './user/reducer';
import callAPIMiddleware from './middlewares/callAPIMiddleware';

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null)
|| compose;

export const middlewares = [thunk, callAPIMiddleware];

export const rootReducer = combineReducers({
  rates: ratesReducer,
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(persistedReducer, composeEnhancers(
    applyMiddleware(...middlewares),
  ));
  const persistor = persistStore(store);
  return { store, persistor };
};
