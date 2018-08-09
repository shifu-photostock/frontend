'use strict'
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import '../css/reset.css';
import '../css/style.css';
import '../favicon.ico';

import store from './containers/store';
import Router from './router';

render((
  <Provider store={store}>
    <Router />
  </Provider>
), document.getElementById('root'));
