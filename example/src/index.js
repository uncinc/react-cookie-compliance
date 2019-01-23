import React from 'react'
import { Map } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { cookieComplianceReducer } from '@uncinc/react-cookie-compliance';

import './index.css'
import App from './App'

const rootReducer = combineReducers({
  cookieCompliance: cookieComplianceReducer,
});

const store = createStore(rootReducer, Map());

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
