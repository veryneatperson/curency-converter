import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'semantic-ui-less/semantic.less';

import configureStore from './store/configureStore';
import AppContainer from './components/App/AppContainer';
import Spinner from './components/common/Spinner/Spinner';

const { store, persistor } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Spinner />} persistor={persistor}>
      <AppContainer />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
